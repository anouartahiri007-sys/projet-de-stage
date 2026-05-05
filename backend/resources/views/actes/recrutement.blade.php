@extends('layouts.app')

@section('content')
<h1 class="text-2xl font-bold mb-4">{{ __('Recrutement') }}</h1>

<form action="{{ route('actes.recrutement.store') }}" method="POST" class="space-y-4">
    @csrf
    <!-- Example fields -->
    <div>
        <label for="employee_id" class="block font-medium">{{ __('Employé') }}</label>
        <select name="employee_id" id="employee_id" class="w-full border rounded p-2" required>
            @foreach($employees as $emp)
                <option value="{{ $emp->id }}">{{ $emp->nom }} {{ $emp->prenom }}</option>
            @endforeach
        </select>
    </div>
    <div>
        <label for="date" class="block font-medium">{{ __('Date') }}</label>
        <input type="date" name="date" id="date" class="w-full border rounded p-2" required />
    </div>
    <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded">
        {{ __('Enregistrer') }}
    </button>
</form>
@endsection
