<?php
$user1 = App\Models\User::firstOrCreate(['email' => 'emp@test.com'], ['name' => 'Ahmed Fonctionnaire', 'password' => bcrypt('password'), 'role' => 'fonctionnaire', 'cin' => 'AB123456']);
App\Models\Fonctionnaire::firstOrCreate(['user_id' => $user1->id], ['matricule' => 'EMP-001', 'grade' => 'Ingénieur', 'department' => 'IT', 'status' => 'Active', 'recruitment_date' => now()]);
$user2 = App\Models\User::firstOrCreate(['email' => 'cand@test.com'], ['name' => 'Karim Candidat', 'password' => bcrypt('password'), 'role' => 'candidat', 'cin' => 'CD789012']);
$cand = App\Models\Candidat::firstOrCreate(['user_id' => $user2->id], ['cin' => 'CD789012', 'first_name' => 'Karim', 'last_name' => 'Candidat', 'code_candidat' => 'CAND-001']);
$concours = App\Models\Concours::firstOrCreate(['title' => 'Concours IT'], ['title' => 'Concours IT', 'description' => 'Test', 'status' => 'open', 'positions_available' => 5, 'publication_date' => now(), 'closing_date' => now()->addDays(5), 'deadline' => now()->addDays(10)]);
App\Models\Candidature::firstOrCreate(['candidat_id' => $cand->id, 'concours_id' => $concours->id], ['status' => 'pending']);
echo "Seeded successfully!";
