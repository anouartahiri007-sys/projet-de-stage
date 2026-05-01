<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
            color: #1e293b;
        }
        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            border: 1px solid #e2e8f0;
        }
        .header {
            background: linear-gradient(135deg, #1e3e6e 0%, #3466a4 100%);
            padding: 40px;
            text-align: center;
            color: #ffffff;
        }
        .content {
            padding: 40px;
            text-align: right;
        }
        .code-box {
            background-color: #f1f5f9;
            border: 2px dashed #3466a4;
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            margin: 32px 0;
        }
        .code {
            font-size: 32px;
            font-weight: 900;
            color: #1e3e6e;
            letter-spacing: 4px;
        }
        .footer {
            background-color: #f8fafc;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
            border-top: 1px solid #e2e8f0;
        }
        .btn {
            display: inline-block;
            background-color: #1e3e6e;
            color: #ffffff !important;
            padding: 14px 28px;
            border-radius: 12px;
            text-decoration: none;
            font-weight: bold;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin:0; font-size: 24px;">E-RH Larache</h1>
            <p style="margin:10px 0 0 0; opacity: 0.8;">بوابة التوظيف الإلكترونية</p>
        </div>
        <div class="content">
            <h2 style="font-size: 20px; color: #1e3e6e;">مرحباً {{ $name }}،</h2>
            <p>لقد تم إنشاء حسابك بنجاح في منصة التوظيف الخاصة بجماعة العرائش.</p>
            <p>يرجى استخدام الرمز التالي لتسجيل الدخول إلى فضاء المترشح الخاص بك:</p>
            
            <div class="code-box">
                <div class="code">{{ $code }}</div>
            </div>
            
            <p style="font-size: 14px; color: #64748b;">هذا الرمز سري، يرجى عدم مشاركته مع أي شخص آخر.</p>
            
            <a href="{{ config('app.url') }}/login" class="btn">الدخول إلى المنصة</a>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} جماعة العرائش - جميع الحقوق محفوظة
        </div>
    </div>
</body>
</html>
