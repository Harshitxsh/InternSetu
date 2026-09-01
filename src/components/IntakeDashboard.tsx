import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  ShieldCheck,
  MapPin,
  ChevronDown,
  ArrowRight,
  Check,
} from 'lucide-react';

import {
  StudentProfile,
  SocialCategory,
  InstituteType,
  IncomeBracket,
} from '../types';

interface IntakeDashboardProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: Partial<StudentProfile>) => void;
  onSubmitForProcessing: () => void;
  onLoadSampleResume: () => void;
}

export const IntakeDashboard: React.FC<IntakeDashboardProps> = ({
  profile,
  onUpdateProfile,
  onSubmitForProcessing,
}) => {
  const [age, setAge] = useState('');
  const [previousApprenticeship, setPreviousApprenticeship] = useState<
    'Yes' | 'No'
  >('No');

  const [governmentEmployee, setGovernmentEmployee] = useState<
    'Yes' | 'No'
  >('No');

  const [activeStep, setActiveStep] = useState(1);

  const handleContinue = () => {
    if (activeStep < 4) {
      setActiveStep(activeStep + 1);
    } else {
      onSubmitForProcessing();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

          {/* LEFT PROFILE PANEL */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-2xl p-7 shadow-sm sticky top-6">

              {/* Profile Illustration */}
              <div className="flex justify-center mb-5">
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-20 h-20 text-blue-700" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-blue-950 text-center">
                Create Your Profile
              </h1>

              <div className="w-8 h-1 bg-blue-700 mx-auto mt-4 mb-6 rounded-full" />

              <p className="text-sm text-slate-600 leading-7">
                Complete your profile to help our AI find the best internship
                opportunities for you.
              </p>

              {/* Steps */}
              <div className="mt-8 space-y-1">

                {/* Step 1 */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                      activeStep >= 1
                        ? 'bg-blue-700 text-white'
                        : 'bg-white border border-slate-300 text-slate-600'
                    }`}
                  >
                    1
                  </div>

                  <span
                    className={`text-sm font-semibold ${
                      activeStep === 1
                        ? 'text-blue-900'
                        : 'text-slate-700'
                    }`}
                  >
                    Personal Information
                  </span>
                </div>

                <div className="ml-[17px] h-7 border-l border-dashed border-blue-300" />

                {/* Step 2 */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                      activeStep >= 2
                        ? 'bg-blue-700 text-white'
                        : 'bg-white border border-slate-300 text-slate-600'
                    }`}
                  >
                    2
                  </div>

                  <span
                    className={`text-sm ${
                      activeStep === 2
                        ? 'font-semibold text-blue-900'
                        : 'text-slate-700'
                    }`}
                  >
                    Academic Information
                  </span>
                </div>

                <div className="ml-[17px] h-7 border-l border-dashed border-blue-300" />

                {/* Step 3 */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                      activeStep >= 3
                        ? 'bg-blue-700 text-white'
                        : 'bg-white border border-slate-300 text-slate-600'
                    }`}
                  >
                    3
                  </div>

                  <span
                    className={`text-sm ${
                      activeStep === 3
                        ? 'font-semibold text-blue-900'
                        : 'text-slate-700'
                    }`}
                  >
                    Eligibility Information
                  </span>
                </div>

                <div className="ml-[17px] h-7 border-l border-dashed border-blue-300" />

                {/* Step 4 */}
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                      activeStep >= 4
                        ? 'bg-blue-700 text-white'
                        : 'bg-white border border-slate-300 text-slate-600'
                    }`}
                  >
                    4
                  </div>

                  <span
                    className={`text-sm ${
                      activeStep === 4
                        ? 'font-semibold text-blue-900'
                        : 'text-slate-700'
                    }`}
                  >
                    Skills & Experience
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-9 space-y-5">

            {/* PERSONAL INFORMATION */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">

              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-700" />
                </div>

                <h2 className="text-xl font-bold text-blue-950">
                  Personal Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

                {/* NAME */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Name
                  </label>

                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) =>
                      onUpdateProfile({
                        fullName: e.target.value,
                      })
                    }
                    placeholder="Enter your full name"
                    className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* AGE */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Age
                  </label>

                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* LOCATION */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Location
                  </label>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                    <input
                      type="text"
                      value={`${profile.state}${
                        profile.district ? ` - ${profile.district}` : ''
                      }`}
                      onChange={(e) => {
                        const parts = e.target.value.split('-');

                        onUpdateProfile({
                          state: parts[0]?.trim() || '',
                          district: parts.slice(1).join('-').trim(),
                        });
                      }}
                      placeholder="Enter your location"
                      className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

              </div>
            </section>


            {/* ACADEMIC INFORMATION */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">

              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-700" />
                </div>

                <h2 className="text-xl font-bold text-blue-950">
                  Academic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

                {/* DEGREE */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Degree
                  </label>

                  <div className="relative">
                    <select
                      value={profile.degree}
                      onChange={(e) =>
                        onUpdateProfile({
                          degree: e.target.value,
                        })
                      }
                      className="appearance-none w-full h-12 px-4 pr-10 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="B.Tech">B.Tech</option>
                      <option value="B.E.">B.E.</option>
                      <option value="B.Sc">B.Sc</option>
                      <option value="BCA">BCA</option>
                      <option value="M.Tech">M.Tech</option>
                    </select>

                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* MAJOR */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Major
                  </label>

                  <div className="relative">
                    <select
                      value={profile.branch}
                      onChange={(e) =>
                        onUpdateProfile({
                          branch: e.target.value,
                        })
                      }
                      className="appearance-none w-full h-12 px-4 pr-10 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Computer Science">
                        Computer Science
                      </option>
                      <option value="Information Technology">
                        Information Technology
                      </option>
                      <option value="Electronics & Communication">
                        Electronics & Communication
                      </option>
                      <option value="Mechanical Engineering">
                        Mechanical Engineering
                      </option>
                      <option value="Electrical Engineering">
                        Electrical Engineering
                      </option>
                      <option value="Civil Engineering">
                        Civil Engineering
                      </option>
                    </select>

                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                  </div>
                </div>

                {/* CGPA */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    CGPA
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    value={profile.cgpa}
                    onChange={(e) =>
                      onUpdateProfile({
                        cgpa: Number(e.target.value),
                      })
                    }
                    placeholder="9.06"
                    className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* COLLEGE */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    College
                  </label>

                  <input
                    type="text"
                    value={profile.instituteName}
                    onChange={(e) =>
                      onUpdateProfile({
                        instituteName: e.target.value,
                      })
                    }
                    placeholder="Enter your college name"
                    className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

              </div>
            </section>


            {/* ELIGIBILITY INFORMATION */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">

              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-700" />
                </div>

                <h2 className="text-xl font-bold text-blue-950">
                  Eligibility Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">

                {/* FAMILY INCOME */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Family Income
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-medium">
                      ₹
                    </span>

                    <select
                      value={profile.annualIncome}
                      onChange={(e) =>
                        onUpdateProfile({
                          annualIncome: e.target.value as IncomeBracket,
                        })
                      }
                      className="appearance-none w-full h-12 pl-10 pr-10 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Below ₹2.5 Lakhs/year (High Affirmative Weightage)">
                        Below ₹2.5 Lakhs
                      </option>

                      <option value="₹2.5L - ₹5.0 Lakhs/year (Medium Priority)">
                        ₹2.5L - ₹5.0 Lakhs
                      </option>

                      <option value="₹5.0L - ₹8.0 Lakhs/year">
                        ₹5.0L - ₹8.0 Lakhs
                      </option>

                      <option value="Above ₹8.0 Lakhs/year">
                        Above ₹8.0 Lakhs
                      </option>
                    </select>

                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                  </div>
                </div>


                {/* INSTITUTE TYPE */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Institute Type
                  </label>

                  <div className="relative">
                    <select
                      value={profile.instituteType}
                      onChange={(e) =>
                        onUpdateProfile({
                          instituteType: e.target.value as InstituteType,
                        })
                      }
                      className="appearance-none w-full h-12 px-4 pr-10 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="Rural / Tier-3 Govt College (Priority +15%)">
                        Rural / Tier-3 Govt College
                      </option>

                      <option value="Tier-2 State Public University">
                        Tier-2 State Public University
                      </option>

                      <option value="Tier-1 Central / Premier Institute">
                        Tier-1 Central / Premier Institute
                      </option>

                      <option value="Private Affiliated Institute">
                        Private Affiliated Institute
                      </option>
                    </select>

                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                  </div>
                </div>


                {/* PREVIOUS APPRENTICESHIP */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Previous Apprenticeship
                  </label>

                  <div className="flex items-center h-12 border border-slate-300 rounded-xl overflow-hidden">

                    <button
                      type="button"
                      onClick={() => setPreviousApprenticeship('Yes')}
                      className={`flex-1 h-full ${
                        previousApprenticeship === 'Yes'
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full border-2 ${
                          previousApprenticeship === 'Yes'
                            ? 'border-blue-600'
                            : 'border-slate-400'
                        }`}>
                          {previousApprenticeship === 'Yes' && (
                            <span className="block w-2 h-2 bg-blue-600 rounded-full m-[2px]" />
                          )}
                        </span>
                        Yes
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviousApprenticeship('No')}
                      className={`flex-1 h-full border-l border-slate-300 ${
                        previousApprenticeship === 'No'
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full border-2 ${
                          previousApprenticeship === 'No'
                            ? 'border-blue-600'
                            : 'border-slate-400'
                        }`}>
                          {previousApprenticeship === 'No' && (
                            <span className="block w-2 h-2 bg-blue-600 rounded-full m-[2px]" />
                          )}
                        </span>
                        No
                      </span>
                    </button>

                  </div>
                </div>


                {/* GOVERNMENT EMPLOYEE */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Government Employee in Family
                  </label>

                  <div className="flex items-center h-12 border border-slate-300 rounded-xl overflow-hidden">

                    <button
                      type="button"
                      onClick={() => setGovernmentEmployee('Yes')}
                      className={`flex-1 h-full ${
                        governmentEmployee === 'Yes'
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full border-2 ${
                          governmentEmployee === 'Yes'
                            ? 'border-blue-600'
                            : 'border-slate-400'
                        }`}>
                          {governmentEmployee === 'Yes' && (
                            <span className="block w-2 h-2 bg-blue-600 rounded-full m-[2px]" />
                          )}
                        </span>
                        Yes
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setGovernmentEmployee('No')}
                      className={`flex-1 h-full border-l border-slate-300 ${
                        governmentEmployee === 'No'
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700'
                      }`}
                    >
                      <span className="inline-flex items-center gap-2">
                        <span className={`w-4 h-4 rounded-full border-2 ${
                          governmentEmployee === 'No'
                            ? 'border-blue-600'
                            : 'border-slate-400'
                        }`}>
                          {governmentEmployee === 'No' && (
                            <span className="block w-2 h-2 bg-blue-600 rounded-full m-[2px]" />
                          )}
                        </span>
                        No
                      </span>
                    </button>

                  </div>
                </div>


                {/* CATEGORY */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                    Category
                  </label>

                  <div className="relative">
                    <select
                      value={profile.socialCategory}
                      onChange={(e) =>
                        onUpdateProfile({
                          socialCategory: e.target.value as SocialCategory,
                        })
                      }
                      className="appearance-none w-full h-12 px-4 pr-10 rounded-xl border border-slate-300 bg-white text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="EWS">EWS</option>
                    </select>

                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />
                  </div>
                </div>

              </div>
            </section>


            {/* CONTINUE BUTTON */}
            <div className="flex justify-center pt-2 pb-4">

              <button
                type="button"
                onClick={handleContinue}
                className="inline-flex items-center gap-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-9 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-white py-7 mt-4">

        <div className="flex flex-col items-center justify-center text-center">

          <div className="flex items-center gap-3">
            <Check className="w-6 h-6 text-white" />

            <div>
              <p className="text-sm font-semibold">
                भारत सरकार
              </p>

              <p className="text-lg font-medium">
                Government of India
              </p>
            </div>
          </div>

        </div>

      </footer>

    </div>
  );
};