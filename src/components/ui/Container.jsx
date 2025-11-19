import React from 'react';

/**
 * مكون حاوي قابل لإعادة الاستخدام
 * يقوم بتوسيط المحتوى وتحديد عرض أقصى له
 * @param {object} props - الخصائص الممررة للمكون
 * @param {React.ReactNode} props.children - العناصر الأبناء ليتم عرضها داخل الحاوية
 * @param {string} [props.className] - كلاسات CSS إضافية لتطبيقها على الحاوية
 */
export default function Container({ children }) {
  return (
    // mx-auto: لتوسيط العنصر أفقيًا
    // max-w-7xl: لتحديد أقصى عرض (يمكنك تغييره حسب تصميمك)
    // px-4: لإضافة padding أفقي على الشاشات الصغيرة
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}