import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from './components/Button';

export const RegistrationForm = () => {
    const [step, setStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        email: '',
        phone: '',
        startNumber: '',
        carType: '',
        location: '',
        comment: '',
        websiteUrl: '', // Honeypot field
        consentAge: false,
        consentRules: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        // Basic honeypot check
        if (formData.websiteUrl) {
            console.log('Bot detected!');
            return;
        }

        // Basic validation
        if (!selectedCategory) {
            alert('Prosím vyberte kategorii.');
            return;
        }

        if (!formData.consentAge || !formData.consentRules) {
            alert('Pro odeslání musíte souhlasit s prohlášením a pravidly.');
            return;
        }

        const submissionData = {
            ...formData,
            category: selectedCategory,
            variableSymbol: '442026',
            isPaid: false,
            submittedAt: new Date().toISOString(),
            formType: 'rider_registration'
        };

        try {
            // Test n8n webhook URL
            const N8N_WEBHOOK_URL = 'https://n8n.srv1004354.hstgr.cloud/webhook-test/4b112680-9384-47ce-b21f-cb0e2ead65a5';

            console.log('Sending data to n8n:', submissionData);

            // Real fetch to n8n
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            alert('Registrace byla úspěšně odeslána ke zpracování!');

            // Reset form
            setStep(1);
            setFormData({
                firstName: '', lastName: '', age: '', email: '', phone: '',
                startNumber: '', carType: '', location: '', comment: '',
                websiteUrl: '', consentAge: false, consentRules: false
            });
            setSelectedCategory('');

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Omlouváme se, při odesílání došlo k chybě. Zkuste to prosím znovu nebo nás kontaktujte.');
        }
    };

    return (
        <section className="py-32 bg-white text-black relative">
            <div className="absolute top-0 left-0 w-full h-3 bg-[#F4CE14] shadow-lg"></div>
            <div className="container mx-auto px-6 max-w-4xl text-left">
                <div className="mb-20 text-center">
                    <h2 className="text-7xl md:text-9xl font-bebas mb-6 tracking-tight leading-none uppercase font-semibold">REGISTRACE JEZDCE</h2>

                    {/* Progress Bar */}
                    <div className="relative flex items-center justify-between px-4 md:px-16 max-w-[280px] md:max-w-none mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-0 h-1 bg-[#F4CE14] transition-all duration-700 -z-10 -translate-y-1/2" style={{ width: `${(step - 1) * 50}%` }}></div>

                        {[1, 2, 3].map(i => (
                            <div key={i} className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center font-tech font-semibold text-base md:text-xl transition-all duration-500 ${step >= i ? 'bg-[#F4CE14] scale-110 shadow-[0_0_30px_rgba(244,206,20,0.6)] border-4 border-white' : 'bg-gray-100 text-gray-400'}`}>
                                {step > i ? <CheckCircle className="w-5 h-5 md:w-7 md:h-7" /> : i}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-6 font-tech text-[9px] md:text-xs text-gray-400 tracking-normal md:tracking-[0.4em] px-0 md:px-4 uppercase font-bold max-w-[280px] md:max-w-none mx-auto">
                        <span>OSOBNÍ ÚDAJE</span>
                        <span>VOZIDLO</span>
                        <span>DOKONČENÍ</span>
                    </div>
                </div>

                <div className="font-tech text-xl">
                    {/* STEP 1: Personal Information */}
                    {step === 1 && (
                        <div className="space-y-6 animate-fadeIn">
                            {/* Honeypot field for bot protection */}
                            <div style={{ display: 'none' }} aria-hidden="true">
                                <label>Webová stránka</label>
                                <input
                                    type="text"
                                    name="websiteUrl"
                                    value={formData.websiteUrl}
                                    onChange={handleInputChange}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Jméno *</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                                        placeholder="Jméno"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Příjmení *</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                                        placeholder="Příjmení"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Věk *</label>
                                <select
                                    name="age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                                >
                                    <option value="">Věk (musí být 18+)</option>
                                    {Array.from({ length: 63 }, (_, i) => i + 18).map(age => (
                                        <option key={age} value={age}>{age} let</option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">E-mail *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                                        placeholder="E-mail"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Mobil *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                                        placeholder="Mobil"
                                    />
                                </div>
                            </div>

                            <Button onClick={() => setStep(2)} className="w-full mt-8">
                                POKRAČOVAT →
                            </Button>
                        </div>
                    )}

                    {/* STEP 2: Vehicle Information */}
                    {step === 2 && (
                        <div className="space-y-6 animate-fadeIn">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Startovní číslo *</label>
                                <select
                                    name="startNumber"
                                    value={formData.startNumber}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                                >
                                    <option value="">Startovní číslo (vyber volné, viz seznam registrovaných, jinak bude přiděleno)</option>
                                    {Array.from({ length: 100 }, (_, i) => i + 1).map(num => (
                                        <option key={num} value={num}>#{num}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Typ závodního vozu *</label>
                                <input
                                    type="text"
                                    name="carType"
                                    value={formData.carType}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                                    placeholder="Typ závodního vozu (Škoda Favorit, Ford Mondeo...)"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Kategorie *</label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { value: 'do1.6L', label: 'DO 1,6L' },
                                        { value: 'nad1.6L', label: 'NAD 1,6L' },
                                        { value: 'zeny', label: 'ŽENY' }
                                    ].map(cat => (
                                        <div
                                            key={cat.value}
                                            onClick={() => setSelectedCategory(cat.value)}
                                            className={`border-2 p-4 cursor-pointer transition-all text-center font-bold ${selectedCategory === cat.value
                                                ? 'border-[#F4CE14] bg-[#F4CE14]/10'
                                                : 'border-gray-200 hover:border-[#F4CE14]/50'
                                                }`}
                                        >
                                            {cat.label}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Odkud jsi?</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base"
                                    placeholder="Odkud jsi?"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase mb-2 tracking-wider">Komentář</label>
                                <textarea
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full border-2 border-gray-200 px-4 py-3 outline-none focus:border-[#F4CE14] transition-colors bg-white text-black font-normal text-base resize-none"
                                    placeholder="Jak se má moderátor představit? Něco o sobě. Přezdívka."
                                ></textarea>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                                    ← ZPĚT
                                </Button>
                                <Button onClick={() => setStep(3)} className="flex-1">
                                    POKRAČOVAT →
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Consent and Payment */}
                    {step === 3 && (
                        <div className="space-y-8 animate-fadeIn">
                            {/* Payment Information Box */}
                            <div className="border-4 border-dashed border-red-500 bg-red-50/50 p-6 md:p-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rotate-45 translate-x-16 -translate-y-16"></div>

                                <h3 className="font-bebas text-4xl text-center mb-8 uppercase tracking-tight text-red-600">
                                    PLATBA STARTOVNÉHO:<br />
                                    <span className="text-2xl text-black">(POUZE PŘEDEM!)</span>
                                </h3>

                                <div className="flex flex-col md:flex-row items-center gap-10">
                                    <div className="flex-1 space-y-4 text-center md:text-left font-bold">
                                        <div>
                                            <p className="font-tech text-gray-500 text-[10px] uppercase tracking-widest mb-1">Číslo účtu:</p>
                                            <p className="font-bebas text-3xl md:text-4xl text-black tracking-tight underline decoration-[#F4CE14] decoration-4 underline-offset-4">2402064559/0600</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="font-tech text-gray-500 text-[10px] uppercase tracking-widest mb-1">Částka:</p>
                                                <p className="font-bebas text-3xl text-red-600">2000 Kč</p>
                                            </div>
                                            <div>
                                                <p className="font-tech text-gray-500 text-[10px] uppercase tracking-widest mb-1">Var. symbol:</p>
                                                <p className="font-bebas text-3xl text-black">442026</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="font-tech text-gray-500 text-[10px] uppercase tracking-widest mb-1">Poznámka pro příjemce:</p>
                                            <p className="font-tech text-base md:text-lg bg-black text-white px-4 py-2 inline-block">VRAKFEST a „Vaše jméno"</p>
                                        </div>
                                    </div>

                                    {/* QR Code Section */}
                                    <div className="w-full md:w-auto flex flex-col items-center">
                                        <div className="bg-white p-4 shadow-xl border-2 border-gray-100 group-hover:border-[#F4CE14] transition-colors duration-500 relative">
                                            <img
                                                src="/qr_payment_demo_1770476385305.png"
                                                alt="QR Platba Demo"
                                                className="w-40 h-40 md:w-48 md:h-48"
                                            />
                                            <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#F4CE14]/20 pointer-events-none transition-all duration-500"></div>
                                        </div>
                                        <p className="font-tech text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">QR PLATBA (DEMO)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className="border-4 border-dashed border-red-500 bg-red-50 p-6">
                                <p className="font-bold text-center mb-4">POZOR – Startovné lze zaplatit pouze předem.<br />Platba startovného hotově na místě nebude možná!</p>
                                <p className="text-sm text-center">Počet startujících závodníků je omezený – platbou předem rezervujete své místo v závodě.</p>
                                <p className="text-sm text-center mt-4">Závodník bude připsán na startovní listinu při přijetí platby.</p>
                                <p className="text-sm text-center mt-4">V ceně je volný vstup pro závodníka jeho posádku včetně místa v depu pro jedno doprovodné vozidlo.</p>
                                <p className="text-sm text-center mt-4 font-bold">Hlavní výhra je 10000 Kč + Stylové poháry od firmy YOMAX a dárky od sponzorů Elektro Dvořák Valašské Meziříčí.</p>
                                <p className="text-sm text-center mt-4 font-bold">Níže najdete pravidla závodu.</p>
                            </div>

                            {/* Consent Checkboxes */}
                            <div className="space-y-4">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="consentAge"
                                        checked={formData.consentAge}
                                        onChange={handleInputChange}
                                        className="mt-1 w-5 h-5 accent-[#F4CE14]"
                                    />
                                    <span className="text-sm">
                                        <strong>Prohlášení o plnoletosti: *</strong><br />
                                        Čestně prohlašuji, že v termín konání závodu jsem starší 18 let.
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="consentRules"
                                        checked={formData.consentRules}
                                        onChange={handleInputChange}
                                        className="mt-1 w-5 h-5 accent-[#F4CE14]"
                                    />
                                    <span className="text-sm">
                                        <strong>Souhlas s pravidly: *</strong><br />
                                        Čestně prohlašuji, že jsem si přečetl pravidla závodu (viz níže), souhlasím s nimi a budu je dodržovat.
                                    </span>
                                </label>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                                    ← ZPĚT
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-green-600 text-white hover:bg-green-700 hover:text-white border-0 hover:shadow-[0_0_20px_rgba(22,163,74,0.5)]"
                                >
                                    🏁 ZAREGISTROVAT
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
