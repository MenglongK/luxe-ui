export type Language = "en" | "km";

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    km: string;
  };
}

export const translations: TranslationDictionary = {
  // Navigation
  nav_home: { en: "Home", km: "ទំព័រដើម" },
  nav_collections: { en: "Collections", km: "បណ្តុំម៉ូដ" },
  nav_new_arrivals: { en: "New Arrivals", km: "ម៉ូដទើបមកដល់" },
  nav_women: { en: "Women", km: "នារី" },
  nav_men: { en: "Men", km: "បុរស" },
  nav_about: { en: "About", km: "អំពីយើង" },
  nav_sale: { en: "Sale", km: "បញ្ចុះតម្លៃ" },
  nav_search: { en: "Search collections...", km: "ស្វែងរកបណ្តុំម៉ូដសម្លៀកបំពាក់..." },
  nav_search_short: { en: "Search", km: "ស្វែងរក" },
  nav_wishlist: { en: "Wishlist", km: "បញ្ជីពេញចិត្ត" },
  nav_bag: { en: "Bag", km: "កន្ត្រកទំនិញ" },
  nav_client_concierge: { en: "Client Concierge", km: "សេវាបម្រើអតិថិជន" },
  
  // Announcement
  ann_free_shipping: {
    en: "Complimentary worldwide express shipping on orders over $200",
    km: "សេវាដឹកជញ្ជូនរហ័សឥតគិតថ្លៃទូទាំងពិភពលោក សម្រាប់ការបញ្ជាទិញចាប់ពី $200 ឡើងទៅ",
  },

  // E-commerce Actions
  btn_add_to_bag: { en: "Add to Bag", km: "ដាក់ចូលកន្ត្រក" },
  btn_added: { en: "Added to Bag", km: "បានដាក់ចូលកន្ត្រក" },
  btn_quick_add: { en: "Quick Add", km: "ទិញរហ័ស" },
  btn_move_to_bag: { en: "Move to Bag", km: "ផ្ទេរទៅកន្ត្រក" },
  btn_remove: { en: "Remove", km: "លុបចេញ" },
  btn_clear_all: { en: "Clear All Saved Items", km: "លុបទាំងអស់ចេញពីបញ្ជី" },
  btn_checkout: { en: "Proceed to Checkout", km: "បន្តទៅការទូទាត់ប្រាក់" },
  btn_view_lookbook: { en: "View Atelier Story", km: "ទស្សនារឿងរ៉ាវម៉ូដ" },
  btn_explore_collections: { en: "Explore Collection", km: "ស្វែងយល់បណ្តុំម៉ូដទាំងអស់" },
  btn_write_review: { en: "Write a Review", km: "សរសេរការវាយតម្លៃ" },

  // Cart & Wishlist
  cart_title: { en: "Shopping Bag", km: "កន្ត្រកទំនិញ" },
  cart_empty: { en: "Your bag is empty", km: "កន្ត្រកទំនិញរបស់អ្នកនៅទទេ" },
  cart_subtotal: { en: "Subtotal", km: "តម្លៃសរុបរង" },
  cart_shipping: { en: "Estimated Shipping", km: "តម្លៃដឹកជញ្ជូនប៉ាន់ស្មាន" },
  cart_free: { en: "Complimentary", km: "ឥតគិតថ្លៃ" },
  cart_total: { en: "Total", km: "តម្លៃសរុប" },
  wishlist_title: { en: "Your Saved Pieces", km: "ម៉ូដដែលបានរក្សាទុក" },
  wishlist_empty: { en: "Your wishlist is currently empty", km: "បញ្ជីពេញចិត្តរបស់អ្នកនៅទទេ" },

  // Product Details
  prod_select_size: { en: "Select Size:", km: "ជ្រើសរើសទំហំ៖" },
  prod_size_guide: { en: "Size & Fit Guide", km: "តារាងទំហំសម្លៀកបំពាក់" },
  prod_color: { en: "Color:", km: "ពណ៌៖" },
  prod_quantity: { en: "Quantity:", km: "ចំនួន៖" },
  prod_save_wishlist: { en: "Save to wishlist", km: "រក្សាទុកក្នុងបញ្ជីពេញចិត្ត" },
  prod_reviews: { en: "Client Reviews", km: "ការវាយតម្លៃពីអតិថិជន" },
  prod_reviews_for_this: { en: "Reviews for this Garment", km: "ការវាយតម្លៃលើម៉ូដនេះ" },
  prod_reviews_all: { en: "All Atelier Reviews", km: "ការវាយតម្លៃសរុបទាំងអស់" },
  prod_recommended: { en: "Recommended Pieces", km: "ម៉ូដសម្លៀកបំពាក់ណែនាំ" },
  prod_complete_look: { en: "Complete the Atelier Look", km: "បំពេញរចនាប័ទ្មឱ្យកាន់តែទាក់ទាញ" },

  // Pagination
  page_prev: { en: "Previous", km: "ថយក្រោយ" },
  page_next: { en: "Next", km: "បន្ទាប់" },
  page_of: { en: "of", km: "នៃ" },
  page_showing: { en: "Showing", km: "កំពុងបង្ហាញ" },
  page_pieces: { en: "pieces", km: "ទំនិញ" },

  // About & Founder
  about_title: { en: "The Architecture of Restrained Luxury", km: "ស្ថាបត្យកម្មនៃភាពប្រណីត និងសោភ័ណភាពថ្លៃថ្នូរ" },
  founder_section_title: { en: "The Founder & System Architect", km: "ស្ថាបនិក និងស្ថាបត្យករប្រព័ន្ធបច្ចេកវិទ្យា" },
  founder_role: { en: "Lead Fullstack Developer & Designer", km: "ប្រធានផ្នែកអភិវឌ្ឍន៍ Fullstack & អ្នករចនា" },
  founder_quote: {
    en: "Building a world-class luxury boutique requires the same principles as master tailoring: clean geometry, enduring structure, and zero compromises in performance.",
    km: "ការបង្កើតគេហទំព័រពាណិជ្ជកម្មម៉ូដលំដាប់ពិភពលោក ទាមទារគោលការណ៍ដូចគ្នានឹងការកាត់ដេរសម្លៀកបំពាក់ជាន់ខ្ពស់៖ រចនាសម្ព័ន្ធរឹងមាំ ភាពផ្ចិតផ្ចង់ និងគុណភាពល្អឥតខ្ចោះ។",
  },

  // Checkout
  checkout_title: { en: "Atelier Checkout", km: "ការទូទាត់ប្រាក់" },
  checkout_contact: { en: "Contact Information", km: "ព័ត៌មានទំនាក់ទំនង" },
  checkout_shipping_address: { en: "Shipping Address", km: "អាសយដ្ឋានដឹកជញ្ជូន" },
  checkout_delivery_method: { en: "Delivery Method", km: "វិធីសាស្ត្រដឹកជញ្ជូន" },
  checkout_payment_method: { en: "Payment Method", km: "វិធីសាស្ត្រទូទាត់" },
  checkout_order_summary: { en: "Order Summary", km: "សេចក្តីសង្ខេបនៃការបញ្ជាទិញ" },
  checkout_promo_code: { en: "Gift card or discount code", km: "លេខកូដបញ្ចុះតម្លៃ" },
  checkout_apply: { en: "Apply", km: "អនុវត្ត" },
  checkout_place_order: { en: "Place Atelier Order", km: "បញ្ជាក់ការបញ្ជាទិញ" },
  checkout_success_title: { en: "Order Placed Successfully", km: "ការបញ្ជាទិញទទួលបានជោគជ័យ" },
  checkout_success_msg: { en: "Thank you for shopping with LUXE Atelier. A confirmation and tracking receipt has been sent to your email.", km: "សូមអរគុណសម្រាប់ការជាវទំនិញពី LUXE Atelier។ សំបុត្របញ្ជាក់ និងលេខតាមដានត្រូវបានផ្ញើទៅកាន់អ៊ីមែលរបស់អ្នក។" },
  checkout_order_number: { en: "Order Reference", km: "លេខកូដបញ្ជាទិញ" },
  checkout_continue_shopping: { en: "Continue Exploring", km: "បន្តការទស្សនាទំនិញ" },

  // Authentication (Login & Register)
  auth_signin: { en: "Sign In", km: "ចូលគណនី" },
  auth_register: { en: "Create Account", km: "បង្កើតគណនី" },
  auth_welcome_back: { en: "Welcome Back to the Atelier", km: "សូមស្វាគមន៍ការត្រឡប់មកកាន់ Atelier" },
  auth_join_society: { en: "Join the Atelier Society", km: "ចូលរួមជាមួយសមាគម Atelier" },
  auth_google_btn: { en: "Continue with Google", km: "បន្តជាមួយ Google" },
  auth_google_signup: { en: "Sign up with Google", km: "ចុះឈ្មោះជាមួយ Google" },
  auth_email: { en: "Email Address", km: "អាសយដ្ឋានអ៊ីមែល" },
  auth_password: { en: "Password", km: "ពាក្យសម្ងាត់" },
  auth_confirm_password: { en: "Confirm Password", km: "ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់" },
  auth_full_name: { en: "Full Name", km: "ឈ្មោះពេញ" },
  auth_remember_me: { en: "Remember this device for 30 days", km: "ចងចាំឧបករណ៍នេះសម្រាប់ 30 ថ្ងៃ" },
  auth_forgot_password: { en: "Forgot password?", km: "ភ្លេចពាក្យសម្ងាត់?" },
  auth_already_have_account: { en: "Already a member of the Atelier?", km: "មានគណនីរួចហើយមែនទេ?" },
  auth_dont_have_account: { en: "Don't have an account yet?", km: "មិនទាន់មានគណនីមែនទេ?" },
  auth_or_divider: { en: "or continue with email", km: "ឬបន្តជាមួយអ៊ីមែល" },
  auth_vip_perk: { en: "Receive 15% off your inaugural order and private salon preview invitations", km: "ទទួលបានការបញ្ចុះតម្លៃ 15% សម្រាប់ការបញ្ជាទិញដំបូង និងការអញ្ជើញពិសេស" },
  auth_terms_agree: { en: "I agree to the LUXE Terms of Service and Privacy Policy", km: "ខ្ញុំយល់ព្រមតាមលក្ខខណ្ឌប្រើប្រាស់ និងគោលការណ៍ឯកជនភាពរបស់ LUXE" },
  auth_success_signin: { en: "Signed in successfully. Welcome back to your Atelier account.", km: "បានចូលគណនីដោយជោគជ័យ។ សូមស្វាគមន៍ការត្រឡប់មកវិញ។" },
  auth_success_register: { en: "Welcome to LUXE Atelier! Your account is created and 15% privilege code has been sent.", km: "សូមស្វាគមន៍មកកាន់ LUXE Atelier! គណនីត្រូវបានបង្កើត ហើយកូដបញ្ចុះតម្លៃ 15% ត្រូវបានផ្ញើរួចរាល់។" },
};
