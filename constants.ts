import { Concept, Category, AspectRatio, ModelAge } from './types';

export const qualityPrompt = "highest quality, ultra-realistic, photorealistic, 8K resolution, high-detail, sharp focus, professional photograph of";

export const ratioPrompts: Record<AspectRatio, string> = {
    '1:1': 'The image MUST be a square photograph with a 1:1 aspect ratio.',
    '4:5': 'The image MUST be a vertical portrait photograph with a 4:5 aspect ratio.',
    '16:9': 'The image MUST be a horizontal landscape photograph with a 16:9 aspect ratio.',
    '9:16': 'The image MUST be a tall, vertical portrait photograph with a 9:16 aspect ratio, perfect for stories.'
};

// Character Profiles Refactored by Age
const femaleNonHijabProfiles = {
    toddler: [
        "a cute Indonesian toddler girl around 3 years old with cheerful eyes and short hair, playing happily",
        "an adorable Indonesian toddler girl with chubby cheeks and a bright smile, looking curious and sweet"
    ],
    kid: [
        "a cheerful Indonesian girl around 8 years old with a ponytail and a joyful, energetic expression",
        "a sweet Indonesian girl around 10 years old with long dark hair, smiling gently at the camera"
    ],
    teen: [
        "a stylish Indonesian teenage girl around 16 years old with modern, trendy hair, looking confident and cool",
        "a friendly Indonesian teenage girl with a natural look and a warm, genuine smile"
    ],
    youngAdult: [
        "a friendly Indonesian woman in her early 20s with long dark hair, warm brown eyes, and a sweet smile",
        "a stylish Indonesian woman in her mid-20s with shoulder-length black hair, expressive eyes, and a confident look",
        "a graceful young Indonesian woman with her hair in a neat bun, glowing tan skin, and a serene expression"
    ],
    adult: [
        "a confident Indonesian woman in her 30s with elegant, shoulder-length hair, looking professional and chic",
        "a warm and sophisticated Indonesian woman in her late 30s with a modern hairstyle, exuding grace and intelligence"
    ],
    matureAdult: [
        "an elegant Indonesian woman in her 50s with stylishly cut short hair, showcasing timeless beauty and confidence",
        "a graceful and charismatic Indonesian woman in her 50s, with a warm smile that reflects wisdom and charm"
    ]
};

const femaleHijabProfiles = {
    toddler: [
        "an adorable Indonesian toddler girl wearing a simple, comfortable, and cute head covering for kids",
        "a sweet Indonesian toddler girl with a playful spirit, wearing a light and colorful kids' hijab"
    ],
    kid: [
        "a sweet Indonesian girl around 8 years old wearing a simple, age-appropriate hijab with a cheerful pattern",
        "a happy young Indonesian girl around 10 years old in a comfortable, practical hijab, with a bright and friendly face"
    ],
    teen: [
        "a fashionable Indonesian teenage girl wearing a modern, trendy hijab style that complements her youthful outfit",
        "a confident Indonesian teenage girl in a stylishly wrapped hijab, with a friendly and approachable look"
    ],
    youngAdult: [
        "a cheerful Indonesian woman in her early 20s wearing a stylish, simple pastel-colored hijab, with bright eyes and a friendly smile",
        "an elegant Indonesian woman in her mid-20s wearing a neatly wrapped, neutral-toned hijab that complements her outfit, looking confident",
        "a fashionable young Indonesian woman wearing a modern, draped hijab, with glowing skin and a gentle expression"
    ],
    adult: [
        "a professional Indonesian woman in her 30s wearing a sophisticated, modern hijab style, looking poised and successful",
        "a graceful Indonesian woman in her late 30s in a beautifully draped hijab, exuding a calm and confident aura"
    ],
    matureAdult: [
        "a wise and elegant Indonesian woman in her 50s wearing a classic, beautifully styled hijab, with a serene and dignified presence",
        "a stylish and modern Indonesian woman in her 50s, wearing a fashionable hijab that complements her graceful age"
    ]
};

const maleCharacterProfiles = {
    toddler: [
        "a cute Indonesian toddler boy around 3 years old with neat hair and a playful, curious expression",
        "an adorable Indonesian toddler boy with bright eyes and a happy smile, full of energy"
    ],
    kid: [
        "a cheerful Indonesian boy around 9 years old with a modern short haircut, looking adventurous and friendly",
        "an energetic Indonesian boy around 7 years old with a happy-go-lucky attitude and a bright smile"
    ],
    teen: [
        "a cool Indonesian teenage boy around 17 years old with a stylish, modern haircut and a confident expression",
        "a friendly Indonesian teenage boy with a casual style and a relaxed, approachable demeanor"
    ],
    youngAdult: [
        "a handsome Indonesian man in his mid-20s with short, clean-cut black hair and a friendly demeanor",
        "a cool young Indonesian man in his early 20s with slightly wavy dark hair, a casual style, and a confident smile",
        "a charming Indonesian man with neat side-parted hair, a slight stubble, and a warm, engaging look"
    ],
    adult: [
        "a sharp and professional Indonesian man in his 30s with a modern haircut, looking confident and successful",
        "a charismatic Indonesian man in his late 30s with a well-groomed beard, exuding a mature and stylish vibe"
    ],
    matureAdult: [
        "a stylish and confident Indonesian man in his 50s, inspired by the reference photo, with a well-groomed short white beard and sunglasses, exuding a cool and sophisticated aura",
        "a distinguished Indonesian man in his 50s with salt-and-pepper hair, looking experienced, wise, and impeccably dressed"
    ]
};


export const characterProfileMap: Record<ModelAge, {
    man: string[];
    woman: {
        hijab: string[];
        'non-hijab': string[];
    };
}> = {
    toddler: {
        man: maleCharacterProfiles.toddler,
        woman: {
            hijab: femaleHijabProfiles.toddler,
            'non-hijab': femaleNonHijabProfiles.toddler,
        },
    },
    kid: {
        man: maleCharacterProfiles.kid,
        woman: {
            hijab: femaleHijabProfiles.kid,
            'non-hijab': femaleNonHijabProfiles.kid,
        },
    },
    teen: {
        man: maleCharacterProfiles.teen,
        woman: {
            hijab: femaleHijabProfiles.teen,
            'non-hijab': femaleNonHijabProfiles.teen,
        },
    },
    'young-adult': {
        man: maleCharacterProfiles.youngAdult,
        woman: {
            hijab: femaleHijabProfiles.youngAdult,
            'non-hijab': femaleNonHijabProfiles.youngAdult,
        },
    },
    adult: {
        man: maleCharacterProfiles.adult,
        woman: {
            hijab: femaleHijabProfiles.adult,
            'non-hijab': femaleNonHijabProfiles.adult,
        },
    },
    'mature-adult': {
        man: maleCharacterProfiles.matureAdult,
        woman: {
            hijab: femaleHijabProfiles.matureAdult,
            'non-hijab': femaleNonHijabProfiles.matureAdult,
        },
    },
};


const createHeldByModelConcept = (id: string): Concept => ({
    id,
    title: "Digenggam oleh Model",
    requiresModelOptions: true,
    basePrompt: `A high-quality, ${qualityPrompt} [character_description], holding the [product_description] in their hands. The setting is a bright, minimalist studio with a neutral-colored background. The focus is on the product and how it looks when held by a person. The model's hands and arms are visible, but their face is slightly out of focus or cropped to keep the emphasis on the product. Maintain the same model and their features across all images.`,
    basePromptWithFace: `Create a high-quality, ${qualityPrompt} a model holding the [product_description]. The model's face, hair, and ethnicity MUST be identical to the person in the second uploaded image (the face reference). The setting is a bright, minimalist studio with a neutral-colored background. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio from the prompt, regardless of the aspect ratios of the input reference images.**`,
    basePromptWithCustomBg: `A high-quality, ${qualityPrompt} [character_description], holding the [product_description]. The setting is [custom_background]. The model should look natural. Maintain the same model and their features across all images.`,
    basePromptWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} a model holding the [product_description]. The model's face MUST be identical to the person in the second uploaded image (the face reference). The setting is [custom_background]. **Crucially, you must maintain the exact same facial identity from the second image and the final output image MUST strictly adhere to the requested aspect ratio from the prompt, ignoring any reference image aspect ratios.**`,
    angles: [
        { name: "Close-up Tangan", modifier: "A close-up shot focusing on the model's hands elegantly holding the product." },
        { name: "Setengah Badan", modifier: "A waist-up shot of the model holding the product, showing how it relates to a person's scale." },
        { name: "Dari Atas", modifier: "A slightly high-angle shot looking down at the product in the model's hands." },
        { name: "Gaya Hidup Candid", modifier: "A candid shot where the model is interacting with the product naturally, e.g., opening it, using it, or simply presenting it." }
    ]
});


export const allConcepts: Record<Category, Concept[]> = {
    fashion: [
        { 
            id: "concept-1",
            title: "Minimalis Tropis", 
            basePrompt: `An ${qualityPrompt} [product_description], hanging on a plain white wall. The scene is illuminated by natural sunlight from a window, creating distinct, sharp shadows of tropical plant leaves on the wall and the product. Include a wooden bench and potted plants to enhance the warm, summery, minimalist aesthetic.`,
            basePromptForBack: `A ${qualityPrompt} showing the **back view** of a [product_description], hanging on a plain white wall. The product's color and fabric must be consistent with the front view. The scene is illuminated by natural sunlight from a window, creating distinct, sharp shadows of tropical plant leaves on the wall and the product. The overall aesthetic must match the front view's warm, summery, minimalist feel.`,
            angles: [
                { name: "Tampilan Depan Penuh", modifier: "Tampilan depan penuh dari produk untuk menunjukkan siluet keseluruhannya di dalam lingkungan." },
                { name: "Tampilan Depan Sudut", modifier: "Ambil gambar dari sudut 45 derajat untuk memberikan kesan kedalaman dan bentuk pada tampilan depan." },
                { name: "Tampilan Belakang Penuh", modifier: "Tampilkan bagian belakang produk, menyoroti kesesuaian dan elemen desain di bagian belakang. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Tampilan Belakang Detail", modifier: "Fokus close-up pada detail bagian belakang produk, seperti jahitan atau label. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        { 
            id: "concept-2",
            title: "Dramatis & Berani", 
            basePrompt: `An ${qualityPrompt} [product_description], displayed on a premium hanger. The background is a solid, rich maroon color. The lighting is dramatic and focused, creating a spotlight effect that highlights the product's texture and colors. The overall feel is bold, modern, and high-fashion.`,
            basePromptForBack: `An ${qualityPrompt} showing the **back view** of a [product_description], displayed on a premium hanger. The background is a solid, rich maroon color. The lighting and overall feel should be consistent with the front view.`,
            angles: [
                { name: "Tampilan Depan Penuh", modifier: "Sebuah foto frontal yang kuat dari produk, diposisikan sempurna di tengah." },
                { name: "Tampilan Depan Sudut Rendah", modifier: "Sebuah foto dari sudut rendah, melihat ke atas pada produk untuk membuatnya tampak dominan dan heroik." },
                { name: "Tampilan Belakang Penuh", modifier: "Sebuah foto frontal yang kuat dari bagian belakang produk. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Tampilan Belakang Detail Kain", modifier: "Close-up ekstrem pada kain bagian belakang, menunjukkan tenunan dan tekstur di bawah pencahayaan dramatis. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        { 
            id: "concept-3",
            title: "Elegan & Profesional", 
            basePrompt: `A clean, ${qualityPrompt} [product_description], displayed on a sleek black mannequin in a minimalist showroom setting. The background is a light gray textured wall. To the side, include a small white table with books and a green potted plant. The lighting is bright and even. The composition is balanced and elegant.`,
             basePromptForBack: `A clean, ${qualityPrompt} showing the **back view** of a [product_description], displayed on a sleek black mannequin in a minimalist showroom setting. The mannequin is turned to show the back. The background is a light gray textured wall with the same props. Lighting and composition should remain elegant and consistent with the front view.`,
            angles: [
                { name: "Tampilan Depan (Manekin)", modifier: "Foto penuh manekin untuk menampilkan bagaimana produk menggantung dan pas." },
                { name: "Tampilan Tiga Perempat (Manekin)", modifier: "Tampilan tiga perempat manekin untuk menunjukkan bagian depan dan samping produk secara bersamaan." },
                { name: "Tampilan Belakang (Manekin)", modifier: "Foto penuh bagian belakang manekin untuk menampilkan bagaimana produk menggantung dan pas dari belakang. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Tampilan Belakang Detail", modifier: "Close-up yang berfokus pada kerah belakang, jahitan bahu, atau detail lain di bagian belakang. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        { 
            id: "concept-6",
            title: "Urban Streetwear", 
            basePrompt: `An ${qualityPrompt} a top-down flat lay of [product_description] on a dark, textured surface like asphalt or dark fabric. Surround the product with modern streetwear accessories like white sneakers, wireless headphones, and a metal grid. The lighting is soft and even, creating a cool, moody, urban aesthetic.`,
            angles: [
                { name: "Classic Flat Lay", modifier: "The product is laid flat and centered, with props neatly arranged at the corners." },
                { name: "Casual Look", modifier: "The product is slightly crumpled or creased naturally, as if just taken off. Props are placed casually nearby." },
                { name: "Texture Close-up", modifier: "A close-up shot focusing on the collar and a sleeve, showing the fabric's texture against the dark background." },
                { name: "Outfit Grid", modifier: "The product is laid out alongside a pair of jeans or shorts and the sneakers, creating a complete 'outfit grid' flat lay." }
            ]
        },
        {
            id: "fashion-new-moody-flatlay",
            title: "Flat Lay Modern & Estetik",
            basePrompt: `An ${qualityPrompt} a top-down flat lay of the [product_description] on a dark grey carpet. The scene is styled for a modern, aesthetic photoshoot, lit with cool, bright, indirect light. In the background, place two minimalist white-framed line art pictures against the wall. A subtle blue LED light strip runs along the base of the wall. Also include a modern potted plant and a mirror that reflects a portion of the product. The overall mood is cool, clean, and stylish.`,
            basePromptForBack: `An ${qualityPrompt} a top-down flat lay of the **back view** of the [product_description] on a dark grey carpet, maintaining the same modern, aesthetic photoshoot style. The scene should still include the framed art, blue LED light, plant, and mirror. The product's color and fabric must be consistent with the front view.`,
            angles: [
                { name: "Tampilan Utama", modifier: "A full top-down shot of the entire flat lay composition, as described in the main prompt." },
                { name: "Close-up Detail", modifier: "A close-up shot focusing on the texture of the fabric and a key detail of the product (like the zipper or star logo), with the other elements softly blurred in the background." },
                { name: "Tampilan Belakang Utama", modifier: "A full top-down shot of the flat lay, but with the product showing its back view. Use the uploaded back image as the primary reference.", isBackView: true },
                { name: "Tampilan Belakang Detail", modifier: "A close-up on the details of the product's back, maintaining the cool, modern aesthetic. Use the uploaded back image as the primary reference.", isBackView: true }
            ]
        },
        {
            id: "fashion-new-boho",
            title: "Bohemian Chic",
            basePrompt: `An ${qualityPrompt} [product_description], featured in a warm, bohemian-inspired setting. The background includes natural textures like a rattan chair, a macrame wall hanging, and dried pampas grass in a vase. The scene is bathed in soft, diffused afternoon sunlight.`,
            basePromptForBack: `An ${qualityPrompt} showing the **back view** of a [product_description], in a warm, bohemian-inspired setting. The product's color and fabric must be consistent with the front view. The scene is bathed in soft, diffused afternoon sunlight.`,
            angles: [
                { name: "Tampilan Penuh Santai", modifier: "Foto penuh produk yang digantung atau diletakkan dengan santai di kursi rotan." },
                { name: "Detail Tekstur Alami", modifier: "Close-up yang menyoroti tekstur produk dengan latar belakang makrame yang sedikit kabur." },
                { name: "Tampilan Belakang Penuh", modifier: "Foto penuh bagian belakang produk, digantung dengan latar belakang pampas grass. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Tampilan Belakang Sudut", modifier: "Foto sudut bagian belakang produk untuk menunjukkan detail dari sisi. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        {
            id: "fashion-new-noir",
            title: "Elegant Noir",
            basePrompt: `A high-contrast, black and white ${qualityPrompt} [product_description]. The product is displayed against a simple dark background. The lighting is dramatic and cinematic, creating deep shadows and bright highlights that emphasize the product's silhouette and texture. The mood is sophisticated and timeless.`,
            basePromptForBack: `A high-contrast, black and white ${qualityPrompt} showing the **back view** of a [product_description]. The lighting is dramatic and cinematic, consistent with the front view.`,
            angles: [
                { name: "Siluet Dramatis", modifier: "Foto yang berfokus pada siluet produk dengan pencahayaan dari samping." },
                { name: "Highlight Tekstur", modifier: "Close-up yang menggunakan cahaya tajam untuk menonjolkan setiap jahitan dan tenunan kain." },
                { name: "Tampilan Belakang Penuh", modifier: "Foto penuh bagian belakang produk dengan bayangan yang dalam. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true },
                { name: "Tampilan Belakang Abstrak", modifier: "Close-up abstrak pada bagian belakang, fokus pada permainan cahaya dan bayangan. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        { 
            id: "concept-7",
            title: "Studio Minimalis", 
            requiresModelOptions: true,
            basePrompt: `A high-quality, ${qualityPrompt} [character_description], wearing [product_description]. The setting is a modern and minimalist indoor studio room with a wooden slat wall, a neat clothing rack in the background, and soft, natural light coming from a large window. The model should look stylish and relaxed. Maintain the same model and their features across all images.`,
            basePromptForBack: `A high-quality, ${qualityPrompt} showing the **back view** of [character_description] wearing [product_description]. The model is turned away from the camera. The setting is the same modern minimalist indoor studio. Maintain model consistency.`,
            basePromptWithFace: `Create a high-quality, ${qualityPrompt} an Indonesian model wearing the specified fashion product, which is a [product_description]. The model's face, hair, and ethnicity MUST be identical to the person in the second uploaded image (the face reference). The setting is a modern and minimalist indoor studio room with a wooden slat wall, a neat clothing rack in the background, and soft, natural light coming from a large window. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio from the prompt, regardless of the aspect ratios of the input reference images.**`,
            basePromptForBackWithFace: `Create a high-quality, ${qualityPrompt} showing the back of an Indonesian model wearing the specified fashion product [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera in a modern minimalist studio. The model's general build, hair, and ethnicity MUST be consistent with the person in the face reference image, even though their face is not visible. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio.**`,
            basePromptWithCustomBg: `A high-quality, ${qualityPrompt} [character_description], wearing [product_description]. The setting is [custom_background]. The model should look stylish and relaxed. Maintain the same model and their features across all images.`,
            basePromptForBackWithCustomBg: `A high-quality, ${qualityPrompt} showing the **back view** of [character_description] wearing [product_description]. The model is turned away from the camera. The setting is [custom_background]. Maintain model and setting consistency.`,
            basePromptWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} a model wearing the specified fashion product, which is a [product_description]. The model's face MUST be identical to the person in the second uploaded image (the face reference). The setting is [custom_background]. **Crucially, you must maintain the exact same facial identity from the second image and the final output image MUST strictly adhere to the requested aspect ratio from the prompt, ignoring any reference image aspect ratios.**`,
            basePromptForBackWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} showing the back of a model wearing the specified fashion product [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera. The model's general build, hair, and ethnicity MUST be consistent with the person in the face reference image. The setting is [custom_background]. **Crucially, the final output must adhere to the requested aspect ratio.**`,
            angles: [
                { name: "Tampilan Depan", modifier: "Foto seluruh badan model dalam pose berdiri natural, menghadap lurus ke kamera untuk menampilkan bagian depan produk secara penuh." },
                { name: "Tampilan Samping Kiri", modifier: "Foto seluruh badan model dari profil sisi kiri, berdiri tegak untuk menunjukkan siluet dan kecocokan produk dari samping." },
                { name: "Tampilan Samping Kanan", modifier: "Foto seluruh badan model dari profil sisi kanan, berdiri tegak untuk menunjukkan siluet dan kecocokan produk dari sisi lainnya." },
                { name: "Tampilan Belakang", modifier: "Foto seluruh badan model dari belakang, berdiri membelakangi kamera untuk menampilkan detail dan tampilan belakang produk. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        { 
            id: "concept-5",
            title: "Dipakai Model Indonesia", 
            requiresModelOptions: true,
            basePrompt: `A high-quality, ${qualityPrompt} [character_description], wearing [product_description]. The setting is a bright, minimalist urban environment like an aesthetic cafe or a clean city street. The focus is on how the product looks when worn, its fit, and style. The model should look natural and relatable. Maintain the same model and her/his features across all images.`,
            basePromptForBack: `A high-quality, ${qualityPrompt} showing the **back view** of [character_description] wearing [product_description]. The model is turned away or walking away from the camera. The setting is the same bright, minimalist urban environment. Maintain model consistency.`,
            basePromptWithFace: `Create a high-quality, ${qualityPrompt} an Indonesian model wearing the specified fashion product, which is a [product_description]. The model's face, hair, and ethnicity MUST be identical to the person in the second uploaded image (the face reference). The setting is a bright, minimalist urban environment like an aesthetic cafe or a clean city street. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio from the prompt, regardless of the aspect ratios of the input reference images.**`,
            basePromptForBackWithFace: `Create a high-quality, ${qualityPrompt} showing the back of an Indonesian model wearing the specified fashion product [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera in a bright urban setting. The model's general build, hair, and ethnicity MUST be consistent with the person in the face reference image, even though their face is not visible. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio.**`,
            basePromptWithCustomBg: `A high-quality, ${qualityPrompt} [character_description], wearing [product_description]. The setting is [custom_background]. The model should look stylish and relaxed. Maintain the same model and their features across all images.`,
            basePromptForBackWithCustomBg: `A high-quality, ${qualityPrompt} showing the **back view** of [character_description] wearing [product_description]. The model is turned away from the camera. The setting is [custom_background]. Maintain model and setting consistency.`,
            basePromptWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} a model wearing the specified fashion product, which is a [product_description]. The model's face MUST be identical to the person in the second uploaded image (the face reference). The setting is [custom_background]. **Crucially, you must maintain the exact same facial identity from the second image and the final output image MUST strictly adhere to the requested aspect ratio from the prompt, ignoring any reference image aspect ratios.**`,
            basePromptForBackWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} showing the back of a model wearing the specified fashion product [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera. The model's general build, hair, and ethnicity MUST be consistent with the person in the face reference image. The setting is [custom_background]. **Crucially, the final output must adhere to the requested aspect ratio.**`,
            angles: [
                { name: "Tampilan Depan", modifier: "Foto seluruh badan model dalam pose berdiri natural, menghadap lurus ke kamera untuk menampilkan bagian depan produk secara penuh." },
                { name: "Tampilan Samping Kiri", modifier: "Foto seluruh badan model dari profil sisi kiri, berdiri tegak untuk menunjukkan siluet dan kecocokan produk dari samping." },
                { name: "Tampilan Samping Kanan", modifier: "Foto seluruh badan model dari profil sisi kanan, berdiri tegak untuk menunjukkan siluet dan kecocokan produk dari sisi lainnya." },
                { name: "Tampilan Belakang", modifier: "Foto seluruh badan model dari belakang, berdiri membelakangi kamera untuk menampilkan detail dan tampilan belakang produk. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        {
            id: "concept-8",
            title: "Butik Modern",
            requiresModelOptions: true,
            basePrompt: `A high-quality, ${qualityPrompt} [character_description] standing tall in the middle of a modern boutique room with warm and elegant lighting. They are wearing [product_description], paired with complementary stylish modern attire. The background shows a minimalist clothing rack with a row of black, gray, and brown suits and jackets, neatly arranged on the wall. At the top of the rack is a black leather bag. The floor is made of light brown herringbone pattern wood, and under the model is a round, fluffy white carpet. The room's lighting is soft, natural, and gives a warm and professional impression, like the atmosphere of an exclusive boutique. Maintain the same model and their features across all images.`,
            basePromptForBack: `A high-quality, ${qualityPrompt} showing the back view of [character_description] standing tall in a modern boutique. They are wearing [product_description]. The model is turned away from the camera. The background setting is a modern boutique with minimalist clothing racks, warm and elegant lighting, and a herringbone wood floor with a white carpet. Maintain model consistency.`,
            basePromptWithFace: `Create a high-quality, ${qualityPrompt} a model wearing [product_description], paired with complementary stylish modern attire. The model's face, hair, and ethnicity MUST be identical to the person in the second uploaded image (the face reference). They are standing in a modern boutique room with warm and elegant lighting. The background features a minimalist clothing rack. The floor is herringbone wood with a white carpet. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio from the prompt.**`,
            basePromptForBackWithFace: `Create a high-quality, ${qualityPrompt} showing the back of a model wearing [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera in a modern boutique setting. The model's general build, hair, and ethnicity MUST be consistent with the person in the face reference image. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio.**`,
            basePromptWithCustomBg: `A high-quality, ${qualityPrompt} [character_description] wearing [product_description], paired with complementary stylish modern attire. The setting is [custom_background]. The model should look stylish and professional. Maintain the same model and their features across all images.`,
            basePromptForBackWithCustomBg: `A high-quality, ${qualityPrompt} showing the back view of [character_description] wearing [product_description]. The model is turned away from the camera. The setting is [custom_background]. Maintain model and setting consistency.`,
            basePromptWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} a model wearing [product_description], paired with complementary stylish modern attire. The model's face MUST be identical to the person in the second uploaded image (the face reference). The setting is [custom_background]. **Crucially, you must maintain the exact same facial identity from the second image and the final output image MUST strictly adhere to the requested aspect ratio from the prompt.**`,
            basePromptForBackWithFaceAndCustomBg: `Create a high-quality, ${qualityPrompt} showing the back of a model wearing [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera. The model's build, hair, and ethnicity must be consistent with the face reference. The setting is [custom_background]. **Crucially, the final output must adhere to the requested aspect ratio.**`,
            angles: [
                { name: "Tampilan Depan", modifier: "Foto seluruh badan model dalam pose berdiri natural, menghadap lurus ke kamera untuk menampilkan bagian depan produk secara penuh." },
                { name: "Tampilan Samping Kiri", modifier: "Foto seluruh badan model dari profil sisi kiri, berdiri tegak untuk menunjukkan siluet dan kecocokan produk dari samping." },
                { name: "Tampilan Samping Kanan", modifier: "Foto seluruh badan model dari profil sisi kanan, berdiri tegak untuk menunjukkan siluet dan kecocokan produk dari sisi lainnya." },
                { name: "Tampilan Belakang", modifier: "Foto seluruh badan model dari belakang, berdiri membelakangi kamera untuk menampilkan detail dan tampilan belakang produk. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        {
            id: "fashion-new-influencer",
            title: "Studio Influencer Modern",
            requiresModelOptions: true,
            basePrompt: `A ${qualityPrompt} [character_description] wearing [product_description]. The setting is a modern influencer's studio with dark grey walls. The model is standing on a minimalist, low-profile walking treadmill. The background is styled with framed music posters, a full-length mirror, and a black clothing rack. The lighting is clean and modern, creating a cool, confident, and stylish atmosphere. Maintain the same model and their features across all images.`,
            basePromptForBack: `A ${qualityPrompt} showing the **back view** of [character_description] wearing [product_description]. The model is turned away from the camera, standing on a minimalist treadmill. The setting is the same modern influencer's studio with dark grey walls and styled background elements. Maintain model consistency.`,
            basePromptWithFace: `Create a ${qualityPrompt} a model wearing [product_description]. The model's face, hair, and ethnicity MUST be identical to the person in the face reference image. The setting is a modern influencer's studio with dark grey walls, a treadmill, posters, and a clothing rack. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio from the prompt.**`,
            basePromptForBackWithFace: `Create a ${qualityPrompt} showing the back of a model wearing [product_description], using the uploaded back image as the primary reference. The model is turned away from the camera in a modern influencer's studio. The model's general build and hair MUST be consistent with the face reference. **Crucially, the final output image MUST strictly adhere to the requested aspect ratio.**`,
            basePromptWithCustomBg: `A ${qualityPrompt} [character_description] wearing [product_description]. The setting is [custom_background]. The model should look cool and confident. Maintain the same model and their features across all images.`,
            basePromptForBackWithCustomBg: `A ${qualityPrompt} showing the **back view** of [character_description] wearing [product_description], turned away from the camera in [custom_background]. Maintain model and setting consistency.`,
            basePromptWithFaceAndCustomBg: `Create a ${qualityPrompt} a model wearing [product_description]. The model's face MUST be identical to the face reference image. The setting is [custom_background]. **Crucially, maintain the exact facial identity and adhere to the requested aspect ratio.**`,
            basePromptForBackWithFaceAndCustomBg: `Create a ${qualityPrompt} showing the back of a model wearing [product_description], using the uploaded back image. The model's build and hair must be consistent with the face reference. The setting is [custom_background]. **Crucially, adhere to the requested aspect ratio.**`,
            angles: [
                { name: "Tampilan Depan", modifier: "Foto seluruh badan model dalam pose berdiri natural, menghadap lurus ke kamera untuk menampilkan bagian depan produk secara penuh." },
                { name: "Tampilan Samping Kiri", modifier: "Foto seluruh badan model dari profil sisi kiri, berdiri tegak untuk menunjukkan siluet dan kecocokan produk dari samping." },
                { name: "Tampilan Samping Kanan", modifier: "Foto seluruh badan model dari profil sisi kanan, berdiri tegak untuk menunjukkan siluet dan kecocokan produk dari sisi lainnya." },
                { name: "Tampilan Belakang", modifier: "Foto seluruh badan model dari belakang, berdiri membelakangi kamera untuk menampilkan detail dan tampilan belakang produk. Gunakan gambar belakang yang diunggah sebagai referensi utama.", isBackView: true }
            ]
        },
        {
            id: "fashion-promo",
            title: "Promosi",
            basePrompt: `${qualityPrompt} a clean, eye-catching promotional shot of [product_description]. The background is a vibrant, solid color gradient that complements the product. Bright, commercial studio lighting is used to make the product look highly desirable and appealing.`,
            angles: [
                { name: "Hero Shot", modifier: "The product is centered and looks heroic and appealing." },
                { name: "Dynamic Angle", modifier: "A slightly low-angle or tilted shot to give a dynamic feel." },
                { name: "Floating", modifier: "The product appears to be floating weightlessly against the clean background." },
                { name: "With Simple Prop", modifier: "The product is next to a single, simple geometric shape or prop that matches the color scheme." }
            ]
        },
        {
            id: "fashion-b-roll",
            title: "B-Roll",
            basePrompt: `${qualityPrompt} a cinematic, slow-motion style lifestyle shot featuring the [product_description]. The setting is atmospheric (e.g., a cozy cafe with warm lighting, a misty morning in a park, a sun-drenched urban street). Use a very shallow depth of field to create a dreamy, high-end, and emotional feel. This shot is intended for use as b-roll footage.`,
            angles: [
                { name: "Close-up Action", modifier: "A close-up of a hand interacting with the product (e.g., picking it up, opening it)." },
                { name: "Environmental Pan", modifier: "A slow pan across the product as it sits in the beautiful environment." },
                { name: "Rack Focus", modifier: "The shot starts with the background blurred and then smoothly focuses on the product." },
                { name: "Detail in Rain/Sun", modifier: "A macro shot of the product with environmental effects like raindrops or a lens flare." }
            ]
        },
        {
            id: "fashion-poster",
            title: "Poster",
            isPoster: true,
            basePrompt: `${qualityPrompt} an artistic background image for a poster featuring the [product_description]. The product should be placed artfully on one side (e.g., the bottom-left third), leaving ample clean, beautiful, and uncluttered negative space on the rest of the image. The background should be aesthetically pleasing (like a textured wall, a minimalist landscape, or an abstract color field) but not distracting from the space reserved for text.`,
            angles: [{ name: "Poster Background", modifier: "Generate a single, high-quality background image with the product placed off-center to allow for text overlay." }],
        }
    ],
    beauty: [
        {
            id: "beauty-1",
            title: "Minimalis & Segar",
            basePrompt: `A clean, minimalist, ${qualityPrompt} the beauty product, [product_description], with dynamic water splashes surrounding it. The background is a solid soft pastel color. Lighting is bright and clean, emphasizing freshness and purity.`,
            angles: [
                { name: "Produk & Percikan", modifier: "A centered shot of the product with a dramatic, frozen-in-time water splash behind it." },
                { name: "Permukaan Basah", modifier: "The product sits on a wet, reflective surface with small water droplets on it." },
                { name: "Dari Atas", modifier: "A top-down shot of the product lying in a shallow pool of clear water." },
                { name: "Detail Tekstur", modifier: "A macro close-up shot on the product's label or nozzle, with a soft water splash in the background." }
            ]
        },
        {
            id: "beauty-2",
            title: "Botani Alami",
            basePrompt: `A vibrant, ${qualityPrompt} the beauty product, [product_description], nestled amongst lush green leaves, delicate flowers, and other natural botanical elements. The setting feels like a serene garden or a rich forest floor.`,
            angles: [
                { name: "Di Antara Dedaunan", modifier: "The product is partially hidden by large, glossy leaves, creating a sense of discovery." },
                { name: "Dengan Bunga", modifier: "The product is laid beside flowers that match its color palette or ingredients." },
                { name: "Sinar Matahari", modifier: "A shot where dappled sunlight filters through leaves onto the product." },
                { name: "Komposisi Flat Lay", modifier: "A top-down flat lay with the product at the center, surrounded by a wreath of leaves and petals." }
            ]
        },
        {
            id: "beauty-3",
            title: "Marmer Mewah",
            basePrompt: `An elegant, ${qualityPrompt} the beauty product, [product_description], placed on a luxurious white or black marble surface. Include subtle, high-end props like a silk ribbon or a small piece of gold jewelry.`,
            angles: [
                { name: "Pantulan di Marmer", modifier: "A low-angle shot that captures the product and its reflection on the polished marble." },
                { name: "Dengan Aksen Emas", modifier: "The product is placed next to a simple gold chain or leaf to add a touch of luxury." },
                { name: "Komposisi Minimalis", modifier: "The product is the sole focus, placed off-center on a large expanse of marble." },
                { name: "Bayangan Lembut", modifier: "Soft, diffused lighting creates gentle shadows, adding depth and sophistication." }
            ]
        },
        {
            id: "beauty-new-lab",
            title: "Lab Clean",
            basePrompt: `A clinical, ${qualityPrompt} the beauty product, [product_description], on a pristine white surface. The background features minimalist lab equipment like glass beakers and petri dishes, suggesting scientific precision and efficacy. The lighting is bright, sterile, and shadowless.`,
            angles: [
                { name: "Komposisi Klinis", modifier: "Produk diatur dengan rapi di samping sebuah gelas kimia berisi cairan bening." },
                { name: "Detail Produk", modifier: "Close-up pada aplikator atau tutup botol produk dengan latar belakang lab yang kabur." },
                { name: "Tetesan Serum", modifier: "Setetes produk terlihat jatuh dari pipet ke permukaan yang bersih." },
                { name: "Grup Produk", modifier: "Produk ditampilkan bersama beberapa item identik yang tersusun dalam barisan yang presisi." }
            ]
        },
        {
            id: "beauty-new-golden",
            title: "Golden Hour Glow",
            basePrompt: `A radiant, ${qualityPrompt} the beauty product, [product_description], during the golden hour. The product is bathed in warm, soft, low-angle sunlight, creating long, gentle shadows and a beautiful lens flare. The background is a dreamy, out-of-focus natural landscape or cityscape.`,
            angles: [
                { name: "Siluet Berkilau", modifier: "Foto dengan cahaya dari belakang yang membuat pinggiran produk bersinar keemasan." },
                { name: "Pantulan Hangat", modifier: "Produk diletakkan di atas permukaan yang memantulkan cahaya matahari terbenam." },
                { name: "Dengan Bayangan Panjang", modifier: "Tampilan dari atas yang menangkap bayangan panjang dan lembut dari produk." },
                { name: "Detail Bercahaya", modifier: "Close-up pada produk di mana cahaya keemasan menyoroti tekstur atau brandingnya." }
            ]
        },
        createHeldByModelConcept('beauty-held-by-model'),
        {
            id: "beauty-promo",
            title: "Promosi",
            basePrompt: `${qualityPrompt} a clean, eye-catching promotional shot of [product_description]. The background is a vibrant, solid color gradient that complements the product. Bright, commercial studio lighting is used to make the product look highly desirable and appealing.`,
            angles: [
                { name: "Hero Shot", modifier: "The product is centered and looks heroic and appealing." },
                { name: "Dynamic Angle", modifier: "A slightly low-angle or tilted shot to give a dynamic feel." },
                { name: "Floating", modifier: "The product appears to be floating weightlessly against the clean background." },
                { name: "With Simple Prop", modifier: "The product is next to a single, simple geometric shape or prop that matches the color scheme." }
            ]
        },
        {
            id: "beauty-b-roll",
            title: "B-Roll",
            basePrompt: `${qualityPrompt} a cinematic, slow-motion style lifestyle shot featuring the [product_description]. The setting is atmospheric (e.g., a cozy cafe with warm lighting, a misty morning in a park, a sun-drenched urban street). Use a very shallow depth of field to create a dreamy, high-end, and emotional feel. This shot is intended for use as b-roll footage.`,
            angles: [
                { name: "Close-up Action", modifier: "A close-up of a hand interacting with the product (e.g., picking it up, opening it)." },
                { name: "Environmental Pan", modifier: "A slow pan across the product as it sits in the beautiful environment." },
                { name: "Rack Focus", modifier: "The shot starts with the background blurred and then smoothly focuses on the product." },
                { name: "Detail in Rain/Sun", modifier: "A macro shot of the product with environmental effects like raindrops or a lens flare." }
            ]
        },
        {
            id: "beauty-poster",
            title: "Poster",
            isPoster: true,
            basePrompt: `${qualityPrompt} an artistic background image for a poster featuring the [product_description]. The product should be placed artfully on one side (e.g., the bottom-left third), leaving ample clean, beautiful, and uncluttered negative space on the rest of the image. The background should be aesthetically pleasing (like a textured wall, a minimalist landscape, or an abstract color field) but not distracting from the space reserved for text.`,
            angles: [{ name: "Poster Background", modifier: "Generate a single, high-quality background image with the product placed off-center to allow for text overlay." }],
        }
    ],
    furniture: [
        {
            id: "furniture-1",
            title: "Interior Skandinavia",
            basePrompt: `An ${qualityPrompt} the piece of furniture, [product_description], placed in a bright, airy Scandinavian-style living room. The room has light wood floors, white walls, and is decorated with minimalist furniture and green plants. Natural light floods in from a large window.`,
            angles: [
                { name: "Konteks Ruangan", modifier: "A wide shot showing the furniture within the context of the room." },
                { name: "Sudut Tiga Perempat", modifier: "A three-quarter view to show the furniture's form and depth." },
                { name: "Detail Material", modifier: "A close-up shot focusing on the texture of the wood, fabric, or other materials." },
                { name: "Gaya Hidup", modifier: "A shot with a subtle human element, like a book and a cup of coffee placed on or near the furniture." }
            ]
        },
        {
            id: "furniture-2",
            title: "Industri Modern",
            basePrompt: `An ${qualityPrompt} the piece of furniture, [product_description], in a modern industrial loft setting. The background features exposed brick walls, metal pipes, and large factory-style windows. The lighting is a mix of natural and warm artificial light.`,
            angles: [
                { name: "Tampilan Penuh", modifier: "A full shot of the furniture against the brick wall." },
                { name: "Sudut Rendah", modifier: "A low-angle shot to make the furniture feel substantial and well-built." },
                { name: "Detail Sambungan", modifier: "A close-up on the joints, welds, or craftsmanship of the furniture." },
                { name: "Dengan Dekorasi", modifier: "The furniture is styled with industrial decor, like an Edison bulb lamp or a metal vase." }
            ]
        }
    ],
    accessories: [
        {
            id: "accessories-1",
            title: "Flat Lay Minimalis",
            basePrompt: `A clean, top-down flat lay ${qualityPrompt} of the accessory, [product_description], arranged neatly on a plain, neutral-colored background (e.g., light gray, beige).`,
            angles: [
                { name: "Komposisi Tengah", modifier: "The accessory is perfectly centered in the frame." },
                { name: "Dengan Objek Terkait", modifier: "The accessory is arranged with other related, stylish items (e.g., a watch with a leather notebook and a pen)." },
                { name: "Detail Tekstur", modifier: "A macro shot focusing on the texture, material, or a specific detail of the accessory." },
                { name: "Komposisi Asimetris", modifier: "The accessory is placed off-center, following the rule of thirds for a more dynamic composition." }
            ]
        },
        {
            id: "accessories-2",
            title: "Gaya Hidup Aksi",
            basePrompt: `A dynamic, in-context ${qualityPrompt} of the accessory, [product_description], being used or worn. The background is slightly blurred to focus on the product, but suggests a relevant activity (e.g., a person tying their shoes with the accessory visible, a bag sitting on a cafe table).`,
            angles: [
                { name: "Dalam Penggunaan", modifier: "A shot showing the accessory in its natural context of use." },
                { name: "Detail Close-up", modifier: "A close-up on the accessory while it's being worn or used." },
                { name: "Motion Blur", modifier: "A shot with slight motion blur to convey a sense of action and energy." },
                { name: "Konteks Lingkungan", modifier: "A wider shot that shows the accessory as part of a whole look or scene." }
            ]
        },
        createHeldByModelConcept('accessories-held-by-model')
    ],
    gaming: [
        {
            id: "gaming-1",
            title: "Setup Gaming Neon",
            basePrompt: `A high-tech, atmospheric ${qualityPrompt} of the gaming product, [product_description], on a desk in a dark room. The scene is illuminated by vibrant neon and RGB LED lights from other gaming peripherals like a keyboard, mouse, and monitor.`,
            angles: [
                { name: "Hero Shot", modifier: "The product is the central focus, bathed in dramatic neon light." },
                { name: "Dalam Genggaman", modifier: "If applicable, a shot of the product being held by hands, illuminated by the screen's glow." },
                { name: "Sudut Atas", modifier: "A top-down view of the desk setup, showing how the product fits into the ecosystem." },
                { name: "Detail Cahaya", modifier: "A close-up focusing on how the RGB lights reflect off the product's surface." }
            ]
        },
        {
            id: "gaming-2",
            title: "Studio Bersih",
            basePrompt: `A clean, modern, ${qualityPrompt} of the gaming product, [product_description], on a white or light gray seamless background. The lighting is bright and even, like in a professional product studio, highlighting the product's design.`,
            angles: [
                { name: "Tampilan Tiga Perempat", modifier: "A classic three-quarter view of the product." },
                { name: "Tampilan Profil", modifier: "A side view of the product." },
                { name: "Mengambang", modifier: "The product is shot as if it's floating weightlessly in the air." },
                { name: "Detail Tombol/Port", modifier: "A macro shot focusing on the specific buttons, ports, or textures of the product." }
            ]
        },
        createHeldByModelConcept('gaming-held-by-model')
    ],
    makanan: [
        {
            id: "makanan-1",
            title: "Meja Makan Rustic",
            basePrompt: `An appetizing, ${qualityPrompt} the food product, [product_description], served on a beautiful ceramic plate. The setting is a rustic wooden dining table, with complementary ingredients and a linen napkin scattered around. The lighting is soft and natural, evoking a warm, homemade feel.`,
            angles: [
                { name: "Dari Atas (Flat Lay)", modifier: "A top-down 'flat lay' shot of the dish and surrounding elements." },
                { name: "Sudut 45 Derajat", modifier: "A classic 45-degree angle shot to show both the top and the side of the dish." },
                { name: "Close-up Tekstur", modifier: "A macro close-up shot that makes the food's texture look delicious and appealing." },
                { name: "Gaya Hidup (dengan tangan)", modifier: "A shot that includes a hand reaching for the food or a utensil, adding a human element." }
            ]
        },
        {
            id: "makanan-2",
            title: "Latar Belakang Minimalis",
            basePrompt: `A clean and modern, ${qualityPrompt} the food product, [product_description]. The background is a solid, vibrant color that contrasts with the food. The lighting is bright and direct, creating crisp shadows and making the colors of the food pop. The composition is simple and graphic.`,
            angles: [
                { name: "Komposisi Tengah", modifier: "The food is placed directly in the center of the frame for a bold, graphic look." },
                { name: "Mengambang (Levitasi)", modifier: "The food or its ingredients are captured as if they are floating in mid-air against the solid background." },
                { name: "Pola Berulang", modifier: "Multiple units of the food are arranged in a neat, repeating pattern." },
                { name: "Potongan Melintang", modifier: "If applicable, a shot showing the cross-section or inside of the food." }
            ]
        },
        createHeldByModelConcept('makanan-held-by-model')
    ],
    minuman: [
        {
            id: "minuman-1",
            title: "Bar yang Menyegarkan",
            basePrompt: `A refreshing, ${qualityPrompt} the beverage, [product_description], served in an appropriate glass with condensation droplets. The setting is a stylish, brightly lit bar or cafe counter, with the background slightly out of focus. Include garnishes like fruit slices or herbs.`,
            angles: [
                { name: "Sudut Lurus", modifier: "A straight-on shot of the glass, highlighting the color and clarity of the beverage." },
                { name: "Close-up Kondensasi", modifier: "A close-up on the glass showing the cold condensation droplets." },
                { name: "Aksi Menuang", modifier: "A dynamic shot of the beverage being poured into the glass." },
                { name: "Dengan Latar Belakang", modifier: "A shot that includes more of the bar environment to create a lifestyle feel." }
            ]
        },
        {
            id: "minuman-2",
            title: "Piknik di Luar Ruang",
            basePrompt: `A bright and sunny, ${qualityPrompt} the beverage, [product_description], as part of an outdoor picnic scene. The product is on a picnic blanket on green grass, surrounded by items like a fruit basket, a book, or sunglasses. The lighting is bright, natural sunlight.`,
            angles: [
                { name: "Flat Lay Piknik", modifier: "A top-down shot of the beverage and other picnic items on the blanket." },
                { name: "Dipegang Tangan", modifier: "A shot of a hand holding the beverage, with the sunny park blurred in the background." },
                { name: "Cahaya Latar", modifier: "A shot taken against the sun to make the beverage glow." },
                { name: "Detail Produk", modifier: "A close-up of the beverage, perhaps with a sun flare in the corner of the frame." }
            ]
        },
        createHeldByModelConcept('minuman-held-by-model')
    ],
    otomotif: [
        {
            id: "otomotif-1",
            title: "Studio Otomotif",
            basePrompt: `An ${qualityPrompt} the [product_description], shot in a modern, minimalist automotive studio. The background is a clean, seamless white or dark gray cyclorama. The lighting is professional and diffuse, highlighting the vehicle's curves and design lines without harsh reflections.`,
            angles: [
                { name: "Tampilan Depan Tiga Perempat", modifier: "A classic three-quarter front view, showcasing the front and side of the vehicle." },
                { name: "Tampilan Profil Samping", modifier: "A direct side profile shot, emphasizing the vehicle's length and silhouette." },
                { name: "Tampilan Belakang Tiga Perempat", modifier: "A three-quarter rear view, highlighting the rear design and tail lights." },
                { name: "Detail Close-up", modifier: "A close-up shot of a specific feature, like the headlight, emblem, or wheel design." }
            ]
        },
        {
            id: "otomotif-2",
            title: "Gaya Hidup Perkotaan",
            basePrompt: `An ${qualityPrompt} the [product_description], parked on a stylish city street at night. The scene is illuminated by streetlights and the neon glow of storefronts, creating dynamic reflections on the vehicle's surface. The mood is cool, modern, and urban.`,
            angles: [
                { name: "Parkir di Jalan", modifier: "The vehicle is parked alongside the curb, with the city's nightlife blurred in the background." },
                { name: "Refleksi Neon", modifier: "A shot focusing on the reflections of neon signs on the vehicle's paint or windows." },
                { name: "Sudut Rendah Dramatis", modifier: "A low-angle shot that makes the vehicle look powerful and imposing against the city skyline." },
                { name: "Detail Interior (dari luar)", modifier: "A shot looking through the window at the illuminated dashboard or steering wheel." }
            ]
        },
        {
            id: "otomotif-3",
            title: "Petualangan Luar Ruang",
            basePrompt: `An ${qualityPrompt} the [product_description], on a scenic, winding mountain road during sunrise. The background features majestic mountains and a golden sky. The vehicle looks adventurous and ready for exploration.`,
            angles: [
                { name: "Menikung di Jalan", modifier: "A dynamic shot of the vehicle navigating a curve in the road." },
                { name: "Menghadap Pemandangan", modifier: "The vehicle is parked at a scenic overlook, with the vast landscape behind it." },
                { name: "Detail Berlumpur", modifier: "A close-up of a tire or lower body panel with a light, realistic spattering of dust or mud." },
                { name: "Drone Shot", modifier: "An aerial-style shot looking down at the vehicle on the remote road." }
            ]
        },
        {
            id: "otomotif-b-roll",
            title: "B-Roll",
            basePrompt: `${qualityPrompt} a cinematic, slow-motion style shot of the [product_description]. The setting is atmospheric (e.g., wet city streets at night, a scenic mountain road at sunrise). Use a very shallow depth of field to create a dreamy, high-end, and emotional feel. This shot is intended for use as b-roll footage.`,
            angles: [
                { name: "Close-up Roda", modifier: "A close-up of a wheel spinning, with water splashing or dust kicking up." },
                { name: "Geser Lambat", modifier: "A slow pan across the vehicle's bodywork, highlighting its sleek lines and reflections." },
                { name: "Fokus Rak", modifier: "The shot starts with the background blurred and then smoothly focuses on the vehicle's emblem or a key design feature." },
                { name: "Detail di Hujan/Matahari", modifier: "A macro shot of the vehicle with environmental effects like raindrops on the paint or a lens flare off the chrome." }
            ]
        }
    ],
    mainan: [
        {
            id: "mainan-1",
            title: "Dunia Imajinasi",
            basePrompt: `A vibrant and playful, ${qualityPrompt} the toy, [product_description], in a magical, imaginative diorama setting that matches the toy's theme (e.g., a castle for a knight, a jungle for an animal figure, outer space for a rocket). The scene is colorful and full of whimsical details.`,
            angles: [
                { name: "Aksi Heroik", modifier: "The toy is posed in a dynamic, heroic action shot within its environment." },
                { name: "Konteks Diorama", modifier: "A wider shot showing the toy within its detailed, miniature world." },
                { name: "Close-up Karakter", modifier: "A close-up shot focusing on the toy's face or key features." },
                { name: "Interaksi dengan Lingkungan", modifier: "The toy is shown interacting with an element of the diorama." }
            ]
        },
        {
            id: "mainan-2",
            title: "Katalog Produk Bersih",
            basePrompt: `A clean, professional, ${qualityPrompt} the toy, [product_description], against a seamless, solid-colored background that makes the toy stand out. The lighting is bright and even, showing off all the toy's details clearly.`,
            angles: [
                { name: "Tampilan Tiga Perempat", modifier: "A standard three-quarter view of the toy." },
                { name: "Mengambang", modifier: "The toy is shot to look like it's floating, with a soft drop shadow beneath it." },
                { name: "Skala (dengan tangan)", modifier: "A shot including a child's hand reaching for or holding the toy to show its scale." },
                { name: "Detail Fitur", modifier: "A macro shot highlighting a specific moving part, button, or detailed paint job." }
            ]
        },
        createHeldByModelConcept('mainan-held-by-model')
    ],
    elektronik: [
        {
            id: "elektronik-1",
            title: "Gaya Hidup Modern",
            basePrompt: `A sleek, modern, ${qualityPrompt} the electronic device, [product_description], in a realistic lifestyle setting. For example, headphones on a person's head in a cafe, a laptop on a clean work desk, or a speaker on a minimalist shelf. The focus is on how the product integrates into a modern user's life.`,
            angles: [
                { name: "Dalam Penggunaan", modifier: "The product is being actively used in a natural, candid way." },
                { name: "Konteks Meja Kerja", modifier: "A top-down or angled shot of the product on a stylish desk with other gadgets." },
                { name: "Close-up Fungsional", modifier: "A close-up on a key feature, like a screen, button, or charging port." },
                { name: "Detail Material", modifier: "A shot that emphasizes the product's materials, like brushed aluminum, matte plastic, or glass." }
            ]
        },
        {
            id: "elektronik-2",
            title: "Studio Teknologi",
            basePrompt: `A sophisticated, studio ${qualityPrompt} of the electronic device, [product_description], against a dark, textured background. The lighting is dramatic and precise, using spotlights or light trails to trace the product's outline and create a high-tech, premium feel.`,
            angles: [
                { name: "Siluet", modifier: "A shot where the product is backlit, emphasizing its shape and form." },
                { name: "Cahaya Tepi", modifier: "Lighting from the side or back highlights the edges of the product." },
                { name: "Pantulan", modifier: "The product is placed on a reflective surface, creating an elegant reflection." },
                { name: "Abstrak", modifier: "An abstract, artistic close-up on a curve or detail of the product." }
            ]
        },
        createHeldByModelConcept('elektronik-held-by-model')
    ],
    olahraga: [
        {
            id: "olahraga-1",
            title: "Aksi Dinamis",
            basePrompt: `A powerful and dynamic, ${qualityPrompt} the sports product, [product_description], captured in a moment of peak action. For example, a basketball mid-air, a running shoe splashing through a puddle, or a dumbbell being lifted. The background shows an appropriate sports environment (court, track, gym) and has a sense of motion blur.`,
            angles: [
                { name: "Momen Puncak", modifier: "The product is frozen in time at the most exciting moment of an action." },
                { name: "Efek Gerakan", modifier: "A panning or motion blur effect is used to convey speed and energy." },
                { name: "Sudut Rendah", modifier: "A low-angle shot to make the product and action look more heroic and impactful." },
                { name: "Detail Elemen", modifier: "A close-up on the product interacting with its environment (e.g., a soccer ball hitting the net, a shoe gripping the ground)." }
            ]
        },
        {
            id: "olahraga-2",
            title: "Studio yang Kuat",
            basePrompt: `A clean and impactful, studio ${qualityPrompt} of the sports product, [product_description], against a simple, textured background like concrete or a dark metal surface. The lighting is dramatic and high-contrast, carving out the product's shape and highlighting its texture and materials.`,
            angles: [
                { name: "Tampilan Pahlawan", modifier: "The product is shot from a slightly low angle to give it a powerful, heroic presence." },
                { name: "Dengan Keringat/Air", modifier: "The product is artfully sprayed with water droplets to suggest sweat and effort." },
                { name: "Komposisi Minimalis", modifier: "The product is the sole focus, placed boldly in the frame." },
                { name: "Detail Tekstur", modifier: "A macro shot showing the grip, stitching, or material texture of the product." }
            ]
        },
        createHeldByModelConcept('olahraga-held-by-model')
    ],
};