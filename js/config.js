/**
 * RAY & CO, VISION LAB — SETTINGS
 * แก้ข้อมูลที่เปลี่ยนบ่อยได้จากไฟล์นี้ไฟล์เดียว
 */
window.RAYCO_CONFIG = {
  brand: {
    logo: 'assets/images/branding/ray-co-vision-lab-logo-v2.png',
    logoAlt: 'Ray & Co, Vision Lab'
  },
  lineUrl: 'https://line.me/R/ti/p/@raycovisionlab',
  lineId: '@raycovisionlab',
  /**
   * SOCIAL LINKS — Facebook และ Instagram เป็นลิงก์ตัวอย่าง กรุณาเปลี่ยนเป็นบัญชีจริงก่อนเผยแพร่
   * ใส่ค่าว่าง '' เพื่อซ่อนไอคอนช่องทางนั้นจาก Footer
   */
  socialLinks: {
    facebook: 'https://www.facebook.com/raycovisionlab',
    instagram: 'https://www.instagram.com/raycovisionlab',
    tiktok: 'https://www.tiktok.com/@moshi.optic',
    line: 'https://line.me/R/ti/p/@raycovisionlab'
  },
  contact: {
    isSample: true,
    address: '99/9 ถนนสุขุมวิท แขวงตัวอย่าง เขตวัฒนา กรุงเทพฯ 10110 (ข้อมูลตัวอย่าง)',
    phone: '0XX-XXX-XXXX (ข้อมูลตัวอย่าง)',
    openingHours: 'ทุกวัน 10:00–20:00 น. (ข้อมูลตัวอย่าง)',
    mapOpenUrl: '',
    mapEmbedUrl: ''
  },
  hero: {
    autoplayMilliseconds: 5500
  },

  /** ภาพประกอบส่วน Brand Promise — แนะนำภาพแนวนอนอย่างน้อย 1200 px */
  brandPromiseImage: 'assets/images/showroom/showroom-05.webp',

  /**
   * CUSTOMER REVIEWS
   * - ข้อมูลชุดนี้เป็นตัวอย่างสำหรับจัดหน้า ต้องเปลี่ยนเป็นรีวิวจริงก่อนเผยแพร่
   * - rating ใช้ตัวเลข 1–5, initials ใช้อักษรย่อ 1–2 ตัว
   * - ใส่ isSample: false หลังเปลี่ยนเป็นข้อมูลจริงแล้ว
   */
  reviewSummary: { average: '4.9', isSample: true },
  reviews: [
    { name: 'คุณมินท์', initials: 'ม', rating: 5, service: 'แว่นสายตา · Personal Fitting', text: 'ทีมงานอธิบายเรื่องเลนส์เข้าใจง่ายมาก ได้ลองหลายทรงโดยไม่รู้สึกเร่งรีบ สุดท้ายได้กรอบที่เข้ากับหน้าและใส่สบายกว่าคู่เดิมมากค่ะ' },
    { name: 'คุณธีร์', initials: 'ธ', rating: 5, service: 'Premium Eye Exam', text: 'ประทับใจขั้นตอนตรวจสายตาที่ละเอียดและเป็นส่วนตัว ได้คำแนะนำตรงกับการทำงานหน้าจอทุกวัน แว่นใหม่ช่วยให้สบายตาขึ้นชัดเจนครับ' },
    { name: 'คุณพลอย', initials: 'พ', rating: 5, service: 'Signature Collection', text: 'ร้านสวย บริการอบอุ่น และเลือกกรอบให้เข้ากับบุคลิกได้ดีมาก ชอบที่ทีมงานให้ข้อมูลครบโดยไม่กดดันให้ตัดสินใจค่ะ' },
    { name: 'คุณนนท์', initials: 'น', rating: 5, service: 'กรอบแว่น · เลนส์เฉพาะบุคคล', text: 'กรอบที่ได้พอดีกับใบหน้ามาก รายละเอียดการปรับแต่งเล็ก ๆ ทำให้ใส่ทั้งวันแล้วไม่กดจมูก บริการหลังการขายก็ดีครับ' },
    { name: 'คุณฝน', initials: 'ฝ', rating: 5, service: 'Personal Styling', text: 'ปกติเลือกแว่นเองไม่ค่อยถูก แต่ทีมงานช่วยเทียบสีและทรงให้เห็นความต่างชัดเจน ได้ลุคที่มั่นใจขึ้นแต่ยังเป็นตัวเองอยู่ค่ะ' },
    { name: 'คุณเจ', initials: 'จ', rating: 4, service: 'แว่นสำหรับทำงาน', text: 'ขั้นตอนเป็นระบบและใช้เวลาเหมาะสม ได้กรอบน้ำหนักเบากับเลนส์ที่ตอบโจทย์งานหน้าจอ บรรยากาศร้านสบายและดูเป็นมืออาชีพครับ' }
  ],

  /**
   * PRODUCT CATALOG
   * ใส่ bestSeller: true เพื่อแสดงป้าย BEST SELLER / สินค้าขายดี
   * เปลี่ยนเป็น false หรือลบบรรทัดนี้เพื่อซ่อนป้าย
   */

  /**
   * CATALOG สินค้า
   * - images: ใส่รูปได้หลายมุม ภาพแรกคือรูปหน้าปก และทุกภาพเปิดซูมได้
   * - ตัวอย่าง: images: ['front.webp', 'side.webp', 'detail.webp', 'on-face.webp']
   * - category ใช้ signature, optical หรือ sunglasses เพื่อให้ตัวกรองทำงาน
   * - price และ oldPrice เป็นข้อความ แก้หรือลบได้โดยใส่ค่าว่าง ''
   * - ราคาด้านล่างเป็นราคาตัวอย่าง กรุณาเปลี่ยนให้ตรงกับราคาจริงก่อนเผยแพร่
   * - รายการด้านล่างเป็นข้อมูลตัวอย่าง กรุณาเปลี่ยนชื่อ/รายละเอียดให้ตรงกับสินค้าจริง
   */
  products: [
    { code: 'RC-S01', name: 'Noir Atelier', description: 'กรอบดำทรงคลาสสิก รายละเอียดสีทอง ให้ลุคเรียบหรูและสวมใส่ง่าย', category: 'signature', badge: 'SIGNATURE', bestSeller: true, collection: 'RAY & CO SIGNATURE', price: '฿3,990', oldPrice: '', images: ['assets/images/products/catalog-01.webp','assets/images/products/catalog-02.webp'], keywords: 'black gold classic signature best seller' },
    { code: 'RC-S02', name: 'Crystal Line', description: 'งานกรอบใสกับขาแว่นสีเข้ม เสริมบุคลิกให้โดดเด่นอย่างมีรายละเอียด', category: 'signature', badge: 'SIGNATURE', collection: 'RAY & CO SIGNATURE', price: '฿4,290', oldPrice: '', images: ['assets/images/products/catalog-02.webp','assets/images/products/catalog-01.webp'], keywords: 'clear crystal gold signature' },
    { code: 'RC-O01', name: 'Graphite Form', description: 'โครงกรอบสีเข้มเส้นบาง น้ำหนักภาพลักษณ์พอดีสำหรับการใช้งานทุกวัน', category: 'optical', badge: 'OPTICAL', collection: 'OPTICAL COLLECTION', price: '฿2,590', oldPrice: '', images: ['assets/images/products/catalog-03.webp'], keywords: 'graphite optical daily minimal' },
    { code: 'RC-O02', name: 'Classic Round', description: 'ทรงกลมร่วมสมัย โทนดำและทอง เหมาะกับลุคที่ดูอบอุ่นและมั่นใจ', category: 'optical', badge: 'OPTICAL', bestSeller: true, collection: 'OPTICAL COLLECTION', price: '฿2,790', oldPrice: '', images: ['assets/images/products/catalog-04.webp'], keywords: 'round optical black gold best seller' },
    { code: 'RC-O03', name: 'Champagne Clear', description: 'กรอบใสโทนแชมเปญกับรายละเอียดสีทอง ให้ลุคเบาสบายและดูประณีต', category: 'optical', badge: 'OPTICAL', collection: 'OPTICAL COLLECTION', price: '฿2,990', oldPrice: '', images: ['assets/images/products/catalog-05-v2.webp','assets/images/products/catalog-05.webp'], keywords: 'clear champagne gold optical modern' },
    { code: 'RC-G01', name: 'Shadow Edge', description: 'เส้นสายสปอร์ตที่ยังคงความเรียบหรู เหมาะกับวันสบายและกิจกรรมกลางแจ้ง', category: 'sunglasses', badge: 'SUNGLASSES', collection: 'SUNGLASSES', price: '฿3,290', oldPrice: '', images: ['assets/images/products/catalog-06-v2.webp','assets/images/products/catalog-06.webp'], keywords: 'sunglasses sport black outdoor' },
    { code: 'RC-O04', name: 'Silver Whisper', description: 'กรอบเกือบไร้ขอบเส้นบาง โทนเงินสะอาดตา ให้ความรู้สึกเบาและทันสมัย', category: 'optical', badge: 'OPTICAL', collection: 'LIGHTWEIGHT EDITION', price: '฿4,590', oldPrice: '', images: ['assets/images/products/catalog-07.webp'], keywords: 'rimless silver titanium lightweight optical' },
    { code: 'RC-S03', name: 'Tortoise Muse', description: 'กรอบ Cat-eye ลายกระพร้อมรายละเอียดทอง เติมความมั่นใจในแบบที่ยังดูคลาสสิก', category: 'signature', badge: 'SIGNATURE', collection: 'RAY & CO SIGNATURE', price: '฿3,990', oldPrice: '', images: ['assets/images/products/catalog-08.webp'], keywords: 'cat eye tortoise gold signature' },
    { code: 'RC-O05', name: 'Tailored Brow', description: 'Browline ดำ–ทองในสัดส่วนเหนือกาลเวลา เหมาะกับลุคสุภาพและมีบุคลิก', category: 'optical', badge: 'OPTICAL', collection: 'HERITAGE OPTICAL', price: '฿3,490', oldPrice: '', images: ['assets/images/products/catalog-09.webp'], keywords: 'browline black gold heritage optical' },
    { code: 'RC-G02', name: 'Aureus Aviator', description: 'Aviator สีทองกับเลนส์ไล่เฉด ให้ลุคเรียบหรูและพร้อมสำหรับวันกลางแจ้ง', category: 'sunglasses', badge: 'SUNGLASSES', collection: 'SUNGLASSES', price: '฿3,890', oldPrice: '', images: ['assets/images/products/catalog-10.webp'], keywords: 'aviator gold gradient sunglasses' },
    { code: 'RC-O06', name: 'Amber Poise', description: 'กรอบใสสีแอมเบอร์ทรงเหลี่ยมมน ให้ความอบอุ่นและเข้ากับการแต่งตัวได้ง่าย', category: 'optical', badge: 'OPTICAL', collection: 'ACETATE COLLECTION', price: '฿2,890', oldPrice: '', images: ['assets/images/products/catalog-11.webp'], keywords: 'amber caramel acetate optical' },
    { code: 'RC-O07', name: 'Forest Line', description: 'กรอบสีเขียวเข้มทรงสี่เหลี่ยม รายละเอียดทองเล็กน้อย ให้ลุคสุขุมที่แตกต่าง', category: 'optical', badge: 'OPTICAL', collection: 'COLOR STUDY', price: '฿3,190', oldPrice: '', images: ['assets/images/products/catalog-12.webp'], keywords: 'forest green rectangular optical gold' }
  ],

  /**
   * TIKTOK VIDEOS
   * - วางลิงก์แบบเต็มที่มี /video/ตัวเลข เช่น https://www.tiktok.com/@account/video/1234567890123456789
   * - เพิ่มได้ทั้งรูปแบบข้อความ 'ลิงก์' หรือ { url: 'ลิงก์', title: 'ชื่อคลิป' }
   * - หากยังไม่มีลิงก์ ให้คงอาร์เรย์ว่าง [] ระบบจะซ่อนส่วน TikTok อัตโนมัติ
   */
  tiktokProfileUrl: 'https://www.tiktok.com/@moshi.optic',
  tiktokVideos: [
    { url: 'https://www.tiktok.com/@moshi.optic/video/7595544660290981128?is_from_webapp=1&sender_device=pc&web_id=7606578136243062292', title: 'วิดีโอแนะนำจาก Moshi Optic 01' },
    { url: 'https://www.tiktok.com/@moshi.optic/video/7667903270853152008?is_from_webapp=1&sender_device=pc&web_id=7606578136243062292', title: 'วิดีโอแนะนำจาก Moshi Optic 02' },
    { url: 'https://www.tiktok.com/@moshi.optic/video/7668287410446322952?is_from_webapp=1&sender_device=pc&web_id=7606578136243062292', title: 'วิดีโอแนะนำจาก Moshi Optic 03' },
    { url: 'https://www.tiktok.com/@moshi.optic/video/7660388296391937288?is_from_webapp=1&sender_device=pc&web_id=7606578136243062292', title: 'วิดีโอแนะนำจาก Moshi Optic 04' }
  ],

  /** รายชื่อแบรนด์ที่แสดงบนหน้าเว็บ — ลบ/เพิ่ม/เรียงใหม่ได้ตามสินค้าที่ร้านมีจริง */
  brands: [
    'RAY-BAN', 'OAKLEY', 'BOLON', 'MIU MIU', 'PRADA', 'LINDBERG',
    'ic! berlin', 'SILHOUETTE', 'MYKITA', 'TOM FORD', 'DIOR', 'SAINT LAURENT',
    'GUCCI', 'CELINE', 'LE SPECS', 'JACQUEMUS', 'BALENCIAGA', 'VERSACE'
  ],

  /**
   * GALLERY บรรยากาศร้าน
   * นำภาพจริงไปไว้ใน assets/images/showroom แล้วใส่ชื่อไฟล์ใน image
   * ถ้า image ยังว่าง ระบบจะแสดง Placeholder ที่ดูเรียบร้อยแทนภาพสมมติ
   */
  gallery: [
    { image: 'assets/images/showroom/showroom-01.webp', title: 'ภาพรวมหน้าร้าน', alt: 'ภาพมุมกว้างของหน้าร้าน Ray & Co, Vision Lab' },
    { image: 'assets/images/showroom/showroom-02.webp', title: 'มุมต้อนรับและจัดแสดง', alt: 'มุมต้อนรับและชั้นจัดแสดงกรอบแว่นภายในร้าน' },
    { image: 'assets/images/showroom/showroom-03.webp', title: 'พื้นที่หน้าร้าน', alt: 'บรรยากาศพื้นที่หน้าร้านและชั้นจัดแสดงกรอบแว่น' },
    { image: 'assets/images/showroom/showroom-04.webp', title: 'ชั้นแสดงคอลเลกชัน', alt: 'ชั้นแสดงคอลเลกชันกรอบแว่นบริเวณหน้าร้าน' },
    { image: 'assets/images/showroom/showroom-05.webp', title: 'Our Signature Pick', alt: 'มุมให้คำปรึกษาและผนังจัดแสดง Our Signature Pick' },
    { image: 'assets/images/showroom/showroom-06.webp', title: 'Personal Consultation', alt: 'พื้นที่นั่งพูดคุยและรับคำแนะนำเฉพาะบุคคล' },
    { image: 'assets/images/showroom/showroom-07.webp', title: 'Signature Display', alt: 'ผนังแสดงกรอบแว่นและเคาน์เตอร์ให้คำปรึกษา' },
    { image: 'assets/images/showroom/showroom-08.webp', title: 'Showroom Interior', alt: 'ทางเดินและพื้นที่ภายในโชว์รูม Ray & Co, Vision Lab' },
    { image: 'assets/images/showroom/showroom-09.webp', title: 'Lens Consultation', alt: 'พื้นที่ให้คำปรึกษาเรื่องกรอบแว่นและเลนส์' },
    { image: 'assets/images/showroom/showroom-10.webp', title: 'Fitting Experience', alt: 'บรรยากาศการเลือกและปรับแต่งกรอบแว่นภายในร้าน' },
    { image: 'assets/images/showroom/showroom-11.webp', title: 'Contact Lens Zone', alt: 'พื้นที่จัดแสดงผลิตภัณฑ์เลนส์สัมผัสภายในร้าน' },
    { image: 'assets/images/showroom/showroom-12.webp', title: 'Showroom Overview', alt: 'ภาพมุมสูงของเคาน์เตอร์และชั้นจัดแสดงภายในร้าน' },
    { image: 'assets/images/showroom/showroom-13.webp', title: 'Vision Lab Overview', alt: 'ภาพมุมสูงของพื้นที่ Vision Lab และจุดให้คำปรึกษา' },
    { image: 'assets/images/showroom/showroom-14.webp', title: 'Personal Lens Service', alt: 'ภาพมุมสูงของพื้นที่บริการด้านเลนส์เฉพาะบุคคล' },
    { image: 'assets/images/showroom/showroom-15.webp', title: 'House of Ray & Co', alt: 'พื้นที่จัดแสดง House of Ray & Co และมุมรับคำแนะนำ' },
    { image: 'assets/images/showroom/showroom-16.webp', title: 'Eye Examination Room', alt: 'ห้องตรวจวัดสายตาและอุปกรณ์ภายใน Vision Lab' }
  ]
};
