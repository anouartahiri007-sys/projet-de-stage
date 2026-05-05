<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; font-size: 12px; direction: rtl; }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #003366; padding-bottom: 20px; }
        .section { margin-bottom: 25px; }
        .section-title { font-weight: bold; font-size: 14px; color: #003366; border-bottom: 1px solid #eee; margin-bottom: 10px; padding-bottom: 5px; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 8px; vertical-align: top; }
        .label { font-weight: bold; color: #64748b; width: 150px; }
        .value { color: #0f172a; }
        .credentials-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; margin-top: 30px; text-align: center; }
        .footer { position: fixed; bottom: 0; width: 100%; text-align: center; font-size: 10px; color: #94a3b8; }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">جماعة العرائش</h1>
        <h2 style="margin: 5px 0; color: #C5A059;">الملف الإداري الرقمي للموظف</h2>
    </div>

    <div class="section">
        <div class="section-title">1. المعلومات الشخصية / Informations Personnelles</div>
        <table>
            <tr>
                <td class="label">الاسم الكامل (Ar):</td>
                <td class="value">{{ $fonctionnaire->nom_ar }} {{ $fonctionnaire->prenom_ar }}</td>
                <td class="label">Nom Complet (Fr):</td>
                <td class="value">{{ $fonctionnaire->nom }} {{ $fonctionnaire->prenom }}</td>
            </tr>
            <tr>
                <td class="label">رقم البطاقة الوطنية:</td>
                <td class="value">{{ $fonctionnaire->cnie }}</td>
                <td class="label">الجنس / Sexe:</td>
                <td class="value">{{ $fonctionnaire->sexe }}</td>
            </tr>
            <tr>
                <td class="label">تاريخ الازدياد:</td>
                <td class="value">{{ $fonctionnaire->date_naissance->format('d/m/Y') }}</td>
                <td class="label">مكان الازدياد:</td>
                <td class="value">{{ $fonctionnaire->lieu_naissance_ar }} ({{ $fonctionnaire->lieu_naissance }})</td>
            </tr>
            <tr>
                <td class="label">الحالة العائلية:</td>
                <td class="value">{{ $fonctionnaire->situation_familiale }}</td>
                <td class="label">عدد الأطفال:</td>
                <td class="value">{{ $fonctionnaire->nombre_enfants }}</td>
            </tr>
            <tr>
                <td class="label">رقم الهاتف:</td>
                <td class="value">{{ $fonctionnaire->telephone }}</td>
                <td class="label">البريد الإلكتروني:</td>
                <td class="value">{{ $user->email }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">2. المعطيات الإدارية</div>
        <table>
            <tr>
                <td class="label">رقم التأجير:</td>
                <td class="value">{{ $fonctionnaire->matricule }}</td>
                <td class="label">تاريخ التوظيف:</td>
                <td class="value">{{ $fonctionnaire->recruitment_date->format('d/m/Y') }}</td>
            </tr>
            <tr>
                <td class="label">الدرجة:</td>
                <td class="value">{{ $fonctionnaire->grade }}</td>
                <td class="label">تاريخ مفعول الدرجة:</td>
                <td class="value">{{ $fonctionnaire->date_grade ? $fonctionnaire->date_grade->format('d/m/Y') : '---' }}</td>
            </tr>
            <tr>
                <td class="label">الرتبة:</td>
                <td class="value">{{ $fonctionnaire->echelon }}</td>
                <td class="label">تاريخ مفعول الرتبة:</td>
                <td class="value">{{ $fonctionnaire->date_echelon ? $fonctionnaire->date_echelon->format('d/m/Y') : '---' }}</td>
            </tr>
            <tr>
                <td class="label">الوظيفة:</td>
                <td class="value">{{ $fonctionnaire->poste }}</td>
                <td class="label">مقر التعيين:</td>
                <td class="value">{{ $fonctionnaire->direction }}</td>
            </tr>
        </table>
    </div>

    <div class="credentials-box">
        <h3 style="margin-top: 0; color: #006241;">بيانات الولوج للمنصة</h3>
        <p>البريد المهني: <strong>{{ $user->email }}</strong></p>
        <p>كلمة المرور المؤقتة: <strong>{{ $password }}</strong></p>
        <p style="font-size: 10px; color: #ef4444; margin-top: 10px;">* يرجى الحفاظ على سرية هذه المعلومات وتغيير كلمة المرور عند أول دخول.</p>
    </div>

    <div class="footer">
        تم استخراج هذه الوثيقة إلكترونياً من منصة E-RH Larache بتاريخ {{ date('d/m/Y H:i') }}
    </div>
</body>
</html>
