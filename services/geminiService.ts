import { GoogleGenAI, Modality, Type } from "@google/genai";
import { AspectRatio, ImageAsset, VideoFlowResult, BrandKit, Product, CampaignGoal, CampaignResult, CarouselResult } from "../types";

const getAiClient = () => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable is not set");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const fileToGenerativePart = (base64Data: string, mimeType: string) => {
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
};

export const analyzeProductImage = async (productImage: string, mimeType: string): Promise<string | null> => {
    try {
        const ai = getAiClient();
        const prompt = `Analyze this product image and provide a short, descriptive name for it in Indonesian. For example: 'Kemeja flanel lengan panjang', 'Sepatu kets putih', 'Botol serum wajah'. Return only the product name, nothing else.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: prompt },
                    fileToGenerativePart(productImage, mimeType),
                ]
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error analyzing product image:", error);
        return null;
    }
};

export const generateImage = async (
  prompt: string,
  productImage: ImageAsset,
  faceImage: ImageAsset | null,
  backgroundImage: ImageAsset | null,
  logoImage: ImageAsset | null
): Promise<string | null> => {
  try {
    const ai = getAiClient();
    const parts = [
        { text: prompt },
        fileToGenerativePart(productImage.data, productImage.mimeType),
    ];
    if (faceImage) parts.push(fileToGenerativePart(faceImage.data, faceImage.mimeType));
    if (backgroundImage) parts.push(fileToGenerativePart(backgroundImage.data, backgroundImage.mimeType));
    if (logoImage) parts.push(fileToGenerativePart(logoImage.data, logoImage.mimeType));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: parts },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:image/png;base64,${base64ImageBytes}`;
        }
    }
    
    console.error("No image data received from API.", response);
    return null;

  } catch (error) {
    console.error("Error calling Gemini Image API:", error);
    return null;
  }
};


export const generateText = async (prompt: string, productImage: ImageAsset, brandKit: BrandKit): Promise<string | null> => {
    try {
        const ai = getAiClient();
        
        const brandInfo = `Informasi Merek: Nama Merek: "${brandKit.brandName}", Suara Merek: "${brandKit.brandVoice}". Gunakan informasi ini untuk menyesuaikan nada tulisan.`;
        const fullPrompt = `${brandInfo}\n\n${prompt}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: fullPrompt },
                    fileToGenerativePart(productImage.data, productImage.mimeType),
                ]
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini Text API:", error);
        return null;
    }
};

export const getAiSuggestions = async (productImage: ImageAsset, productDescription: string, brandKit: BrandKit): Promise<any | null> => {
    try {
        const ai = getAiClient();
        const prompt = `Act as a creative director for a top-tier advertising agency. 
        Your client's brand is named "${brandKit.brandName}" and their brand voice is "${brandKit.brandVoice}". Their brand colors are [${brandKit.colors.filter(c => c).join(', ')}].
        Based on the uploaded product image, its description ("${productDescription}"), and the brand identity, provide creative suggestions in JSON format. The output must strictly follow the provided schema.
        - For 'descriptions', generate 3 catchy, alternative product descriptions in Indonesian that match the brand's voice.
        - For 'concepts', generate 3 creative and specific photoshoot/scene concepts in Indonesian. These concepts should feel on-brand.
        - For 'keywords', generate 5 relevant keywords in Indonesian for style or background inspiration. Some keywords could relate to the brand colors.
        Ensure the JSON is valid.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: prompt },
                    fileToGenerativePart(productImage.data, productImage.mimeType),
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        descriptions: { type: Type.ARRAY, items: { type: Type.STRING } },
                        concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
                        keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                },
            },
        });
        
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr);

    } catch (error) {
        console.error("Error calling Gemini for AI suggestions:", error);
        return null;
    }
}

export const generateVideoFlowPrompt = async (sceneImages: ImageAsset[], campaignDescription: string, brandKit: BrandKit): Promise<VideoFlowResult | null> => {
    try {
        const ai = getAiClient();
        const prompt = `You are a professional video director for the brand "${brandKit.brandName}". The brand's voice is "${brandKit.brandVoice}".
Analyze the following images, which represent scenes for a promotional video about "${campaignDescription}". Your task is to create a JSON object describing a coherent video flow. The JSON object must be an array of scene objects. Each scene object must have the following properties:
- "scene_number": An integer starting from 1.
- "image_description": A brief, 1-2 sentence description of what you see in the corresponding input image.
- "video_prompt": A detailed, creative prompt for an AI video generator (like Google Veo) to create this scene. This prompt should describe the action, camera movement (e.g., "slow pan right", "cinematic push-in"), and mood.
- "duration_seconds": An integer between 5 and 8.
- "voice_over": A short, engaging voice-over script for this scene, in Indonesian. The voice-over MUST perfectly match the brand's voice: "${brandKit.brandVoice}".

Ensure the scenes connect logically to tell a compelling story for the promotional video. The final output must be a valid JSON array only, with no other text or markdown formatting. The number of objects in the array must match the number of images provided.`;
        
        const imageParts = sceneImages.map(image => fileToGenerativePart(image.data, image.mimeType));
        const parts = [
            { text: prompt },
            ...imageParts
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            scene_number: { type: Type.INTEGER },
                            image_description: { type: Type.STRING, description: "A brief, 1-2 sentence description of what you see in the corresponding input image." },
                            video_prompt: { type: Type.STRING, description: "A detailed, creative prompt for an AI video generator to create this scene, including action, camera movement, and mood." },
                            duration_seconds: { type: Type.INTEGER, description: "An integer between 5 and 8." },
                            voice_over: { type: Type.STRING, description: "A short, engaging voice-over script for this scene, in Indonesian." },
                        },
                        required: ['scene_number', 'image_description', 'video_prompt', 'duration_seconds', 'voice_over']
                    }
                },
            },
        });
        
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr) as VideoFlowResult;

    } catch (error) {
        console.error("Error calling Gemini for video flow prompt:", error);
        return null;
    }
}

export const generateVideo = async (
  base64Image: string,
  mimeType: string,
  motionPrompt: string
): Promise<any> => {
  try {
    const ai = getAiClient();
    const operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: motionPrompt,
      image: {
        imageBytes: base64Image,
        mimeType: mimeType,
      },
      config: {
        numberOfVideos: 1,
      }
    });
    return operation;
  } catch (error) {
    console.error("Error initiating video generation:", error);
    // Re-throw the error so the UI can handle it specifically
    throw error;
  }
};

export const pollVideoStatus = async (operation: any): Promise<string | null> => {
    const ai = getAiClient();
    let currentOperation = operation;
    while (!currentOperation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        try {
            currentOperation = await ai.operations.getVideosOperation({ operation: currentOperation });
        } catch (error) {
            console.error("Error polling video status:", error);
            // Re-throw the error to be caught by the UI
            throw error;
        }
    }
    return currentOperation.response?.generatedVideos?.[0]?.video?.uri || null;
};


export const generateAudio = async (script: string, voiceName: string): Promise<{ audioData: string, mimeType: string } | null> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: script }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceName } },
                },
            },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];

        if (!part?.inlineData?.data) {
            console.error("No audio data received from API.", response);
            throw new Error("No audio data received from API.");
        }
        
        return { audioData: part.inlineData.data, mimeType: part.inlineData.mimeType };

    } catch (error) {
        console.error("Error calling TTS API:", error);
        return null;
    }
};

export const generateCampaign = async (product: Product, goal: CampaignGoal, brandKit: BrandKit): Promise<CampaignResult | null> => {
    if (!product.image) return null;
    try {
        const ai = getAiClient();
        const goalMap = {
            peluncuran_produk: 'Product Launch',
            peningkatan_engagement: 'Engagement Boost',
            promo_diskon: 'Discount Promotion',
            pengenalan_merek: 'Brand Awareness'
        };

        const prompt = `Act as a digital marketing strategist.
        **Brand Identity:**
        - Brand Name: "${brandKit.brandName}"
        - Brand Voice: "${brandKit.brandVoice}"

        **Product Information:**
        - Product Name/Type: "${product.description}"

        **Campaign Goal:** ${goalMap[goal]}

        Based on all the information above, create a comprehensive mini-campaign plan in Indonesian. Your response MUST be a valid JSON object that follows the provided schema.

        **JSON Schema Breakdown:**
        - "main_concept": A single, catchy, creative concept for the entire campaign.
        - "content_schedule": An array of 3-5 content ideas for a social media schedule. For each, specify the day (e.g., 1, 3, 5), platform (e.g., "Instagram", "TikTok"), and a brief post idea.
        - "visual_suggestions": An array of 2-3 specific visual asset ideas. For each, suggest which tool ("Product Photoshoot" or "Video Flow Generator") and concept name from the app would be best to use.
        - "ad_copy_examples": An array of 2 ad copy examples. For each, specify the platform (e.g., "Instagram Feed", "Facebook Ads") and write a short, compelling copy that matches the brand voice.
        - "hashtags": An array of 5-7 relevant hashtags, including a unique brand hashtag.
        
        Ensure the final output is ONLY the JSON object, with no extra text or markdown.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: {
                parts: [
                    { text: prompt },
                    fileToGenerativePart(product.image.data, product.image.mimeType),
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        main_concept: { type: Type.STRING },
                        content_schedule: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: { day: { type: Type.INTEGER }, platform: { type: Type.STRING }, post_idea: { type: Type.STRING } }
                            }
                        },
                        visual_suggestions: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: { tool: { type: Type.STRING }, concept_name: { type: Type.STRING } }
                            }
                        },
                        ad_copy_examples: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: { platform: { type: Type.STRING }, copy: { type: Type.STRING } }
                            }
                        },
                        hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                },
            },
        });
        
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr) as CampaignResult;

    } catch (error) {
        console.error("Error calling Gemini for campaign generation:", error);
        return null;
    }
};

export const generateCarousel = async (product: Product, brandKit: BrandKit): Promise<CarouselResult | null> => {
    if (!product.image) return null;
    try {
        const ai = getAiClient();
        const prompt = `You are a social media manager for the brand "${brandKit.brandName}", whose voice is "${brandKit.brandVoice}".
        Your task is to create a JSON object with ideas for an engaging Instagram carousel post about the product: "${product.description}".
        The JSON object must be an array of 3 to 5 slide objects. Each slide object must have the following properties:
        - "slide_number": An integer starting from 1.
        - "visual_prompt": A detailed, creative prompt for an AI image generator to create the visual for this slide.
        - "description": A brief, 1-2 sentence description of what the visual for this slide should show.
        - "caption": A short, engaging caption for this specific slide, written in Indonesian and matching the brand's voice.
        
        The carousel should tell a mini-story or highlight different aspects of the product logically. For example: Slide 1 - Hero shot, Slide 2 - Feature focus, Slide 3 - Lifestyle context.
        The final output must be a valid JSON array only, with no other text or markdown formatting.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    { text: prompt },
                    fileToGenerativePart(product.image.data, product.image.mimeType),
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            slide_number: { type: Type.INTEGER },
                            visual_prompt: { type: Type.STRING },
                            description: { type: Type.STRING },
                            caption: { type: Type.STRING },
                        },
                        required: ['slide_number', 'visual_prompt', 'description', 'caption']
                    }
                },
            },
        });
        
        const jsonStr = response.text.trim();
        return JSON.parse(jsonStr) as CarouselResult;

    } catch (error) {
        console.error("Error calling Gemini for carousel generation:", error);
        return null;
    }
}