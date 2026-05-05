<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; background-color: #f4f7f6; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 40px; border-radius: 20px; shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #003366; margin-bottom: 10px; }
        .content { margin-bottom: 30px; text-align: right; }
        .credentials { background: #f8fafc; padding: 20px; border-radius: 15px; border: 1px solid #e2e8f0; margin: 20px 0; }
        .credentials p { margin: 5px 0; font-weight: bold; }
        .footer { text-align: center; color: #94a3b8; font-size: 12px; }
        .btn { display: inline-block; padding: 12px 30px; background: #006241; color: #fff; text-decoration: none; border-radius: 10px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>مرحباً بك في جماعة العرائش</h1>
            <p>E-RH Larache Platform</p>
        </div>
        <div class="content">
            <p>السيد(ة) {{ $fonctionnaire->nom }} {{ $fonctionnaire->prenom }}،</p>
            <p>يسعدنا إخبارك بأنه قد تم إنشاء ملفك الإداري بنجاح في منصة الموارد البشرية الخاصة بجماعة العرائش.</p>
            <p>تجدون أسفله بيانات الولوج الخاصة بكم للمنصة المهنية:</p>
            
            <div class="credentials">
                <p>البريد الإلكتروني المهني: <span style="color: #003366;">{{ $user->email }}</span></p>
                <p>كلمة المرور المؤقتة: <span style="color: #C5A059;">{{ $password }}</span></p>
            </div>

            <p>يرجى تغيير كلمة المرور بعد أول تسجيل دخول لضمان أمن حسابكم.</p>
            <p>لقد قمنا بإرفاق ملف PDF يحتوي على تفاصيل ملفكم الإداري الكامل.</p>
            
            <div style="text-align: center; margin-top: 30px;">
                <a href="{{ config('app.url') }}/login" class="btn">تسجيل الدخول للمنصة</a>
            </div>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} جماعة العرائش - قسم الموارد البشرية</p>
        </div>
    </div>
</body>
</html>
