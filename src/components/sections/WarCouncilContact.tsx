"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";
import CelestialHeading from "@/components/ui/CelestialHeading";

interface WizardStep {
  id: string;
  label: string;
  question: string;
  placeholder: string;
  field: string;
  type: string;
  options?: string[];
  isTextArea?: boolean;
}

const steps: WizardStep[] = [
  {
    id: "name",
    label: "01 // IDENTIFY YOURSELF",
    question: "What is your name?",
    placeholder: "Your Name",
    field: "identity",
    type: "text"
  },
  {
    id: "email",
    label: "02 // ESTABLISH COMMUNICATION",
    question: "What is your work email?",
    placeholder: "Work Email",
    field: "nexus",
    type: "email"
  },
  {
    id: "project",
    label: "03 // DETERMINE MISSION",
    question: "What system are we building?",
    placeholder: "e.g., Custom Web App, IT Architecture...",
    field: "architecture",
    type: "text",
    options: [
      "Websites & Applications",
      "IT Systems & Operations",
      "Strategic Custom Solutions",
      "Other Custom Build"
    ]
  },
  {
    id: "company",
    label: "04 // BUSINESS ENTITY",
    question: "What is your business name?",
    placeholder: "Business / Organization Name",
    field: "company",
    type: "text"
  },
  {
    id: "phone",
    label: "05 // TELEPHONIC CONTACT",
    question: "What is your phone number?",
    placeholder: "Phone Number",
    field: "phone",
    type: "tel"
  },
  {
    id: "message",
    label: "06 // PROJECT COMPLETION",
    question: "When would you like the project to be completed?",
    placeholder: "e.g., Within 3 months, by end of year...",
    field: "message",
    type: "text"
  }
];

export default function WarCouncilContact() {
  const { clink, slash } = useHaptics();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    identity: "",
    architecture: "",
    nexus: "",
    company: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const lastWheelTime = useRef(0);
  const formRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    const currentStepConfig = steps[currentStep - 1];
    const val = formData[currentStepConfig.field as keyof typeof formData];
    
    if (!val || val.trim() === "") {
      setValidationError("Field is required before proceeding.");
      return;
    }
    
    if (currentStepConfig.type === "email" && !val.includes("@")) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setValidationError(null);
    lastWheelTime.current = Date.now();

    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      slash();
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setValidationError(null);
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <section id="contact" className="pt-fb8 md:pt-fb9 pb-fb6 md:pb-fb7 relative overflow-hidden border-t border-white/5 bg-royal-obsidian/50 backdrop-blur-md z-10">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 bg-parchment-grain opacity-5 pointer-events-none mix-blend-overlay" />

      <div className="container max-w-[1500px] mx-auto px-fb3 md:px-fb4 relative z-10">
        
        {/* Section Header (Grid Spine Alignment) */}
        <div className="mb-fb8 border-l border-metallic-brass/40 pl-6 md:pl-8">
          <div className="flex items-center gap-fb2 mb-fb3">
            <span className="text-[10px] tracking-[0.3em] font-ui text-metallic-brass uppercase">START HERE</span>
          </div>
          <CelestialHeading 
            text={"LET'S FIND OUT\nIF WE'RE THE\nRIGHT FIT."}
            as="h2"
            fontSize={128}
            className="text-5xl md:text-[8rem]"
            intensity={1.2}
          />
          <p className="text-white/80 text-lg md:text-xl font-body leading-relaxed max-w-2xl mt-6 no-prose">
            If you are building for the long run and value architectural excellence, tell us about your project below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-fb7 items-start">
          
          {/* Interactive Stepper Wizard Container (lg:col-span-10 max-w-5xl) */}
          <div className="lg:col-span-10 max-w-5xl bg-white/2 border border-white/5 backdrop-blur-md p-8 md:p-12 min-h-[420px] flex flex-col justify-between relative group overflow-hidden">
            {/* Ambient Background Effect */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-metallic-brass/10 z-0" />
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-metallic-brass/10 z-0" />
            
            <AnimatePresence mode="wait">
              {!submitted ? (
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[300px]">
                  
                  {/* Step Progress Tracker */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 select-none">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        {steps.map((s, idx) => {
                          const stepNum = idx + 1;
                          const isActive = currentStep === stepNum;
                          const isCompleted = stepNum < currentStep;
                          
                          return (
                            <button
                              key={s.id}
                              onClick={() => {
                                if (stepNum < currentStep) {
                                  setCurrentStep(stepNum);
                                  setValidationError(null);
                                } else if (stepNum > currentStep) {
                                  let canGo = true;
                                  for (let i = 0; i < idx; i++) {
                                    const val = formData[steps[i].field as keyof typeof formData];
                                    if (!val || val.trim() === "") {
                                      canGo = false;
                                      break;
                                    }
                                  }
                                  if (canGo) {
                                    setCurrentStep(stepNum);
                                    setValidationError(null);
                                  }
                                }
                              }}
                              className={`font-heading text-lg md:text-xl transition-all focus:outline-none flex flex-col items-center relative pb-1.5 ${
                                isActive 
                                  ? "text-metallic-brass font-bold" 
                                  : isCompleted 
                                    ? "text-metallic-brass/70 hover:text-metallic-brass" 
                                    : "text-white/10 cursor-not-allowed"
                              }`}
                            >
                              <span>{String(stepNum).padStart(2, "0")}</span>
                              {isCompleted && (
                                <motion.span 
                                  layoutId={`completed-dot-${s.id}`}
                                  className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-metallic-brass"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      
                      <div className="h-[2px] bg-white/10 w-16 md:w-24 relative overflow-hidden">
                        <motion.div 
                          className="absolute inset-y-0 left-0 bg-metallic-brass"
                          initial={{ width: 0 }}
                          animate={{ width: `${(currentStep / steps.length) * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                    <span className="text-[9px] tracking-[0.2em] font-ui text-metallic-brass/50 uppercase">
                      BUILD PROTOCOL
                    </span>
                  </div>

                  {/* Question and Input Area */}
                  <div className="flex-1 flex flex-col justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="space-y-4"
                      >
                        <span className="text-[10px] uppercase tracking-widest text-metallic-brass/50 font-ui block">
                          {steps[currentStep - 1].label}
                        </span>
                        <h3 className="text-2xl md:text-4xl font-heading text-off-white uppercase leading-none no-prose">
                          {steps[currentStep - 1].question}
                        </h3>
                        
                        {/* Large format inputs / options selector */}
                        <div className="relative pt-4">
                          {steps[currentStep - 1].options ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {steps[currentStep - 1].options!.map((opt) => {
                                const isSelected = formData[steps[currentStep - 1].field as keyof typeof formData] === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, [steps[currentStep - 1].field]: opt })}
                                    className={`p-4 text-left border rounded-lg transition-all duration-300 font-ui text-[11px] md:text-xs uppercase tracking-[0.2em] ${
                                      isSelected
                                        ? "bg-metallic-brass/10 border-metallic-brass text-metallic-brass shadow-[0_0_15px_rgba(201,168,76,0.15)]"
                                        : "bg-white/2 border-white/10 text-off-white/60 hover:border-white/20 hover:text-off-white"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          ) : steps[currentStep - 1].isTextArea ? (
                            <textarea
                              rows={3}
                              value={formData[steps[currentStep - 1].field as keyof typeof formData]}
                              placeholder={steps[currentStep - 1].placeholder}
                              onChange={(e) => setFormData({ ...formData, [steps[currentStep - 1].field]: e.target.value })}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleNext();
                                }
                              }}
                              className="w-full bg-transparent border-b border-white/10 text-xl md:text-2xl text-metallic-brass focus:border-metallic-brass focus:outline-none py-2 transition-colors duration-500 placeholder-white/20 resize-none font-body"
                            />
                          ) : (
                            <input
                              type={steps[currentStep - 1].type}
                              value={formData[steps[currentStep - 1].field as keyof typeof formData]}
                              placeholder={steps[currentStep - 1].placeholder}
                              onChange={(e) => setFormData({ ...formData, [steps[currentStep - 1].field]: e.target.value })}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleNext();
                                }
                              }}
                              autoFocus={typeof window !== "undefined" && window.location.pathname === "/start-project"}
                              className="w-full bg-transparent border-b border-white/10 text-xl md:text-2xl text-metallic-brass focus:border-metallic-brass focus:outline-none py-2 transition-colors duration-500 placeholder-white/20 font-body"
                            />
                          )}
                          
                          {!steps[currentStep - 1].options && (
                            <motion.div 
                              className="absolute bottom-0 left-0 h-[2px] bg-metallic-brass shadow-[0_0_10px_rgba(201,168,76,0.4)]"
                              initial={{ width: 0 }}
                              animate={{ width: formData[steps[currentStep - 1].field as keyof typeof formData] ? "100%" : "0%" }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* Validation Error Alert */}
                    <AnimatePresence>
                      {validationError && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-red-400 text-xs md:text-sm font-ui uppercase tracking-wider mt-4"
                        >
                          {validationError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex flex-wrap items-center gap-4 pt-8 mt-6">
                    {currentStep > 1 && (
                      <button
                        onClick={handleBack}
                        className="btn-ghost border border-white/10 hover:border-metallic-brass/40 px-6 py-3 transition-all duration-500 uppercase tracking-widest text-[10px] text-center"
                      >
                        Back
                      </button>
                    )}
                    
                    <button
                      onClick={handleNext}
                      onMouseEnter={clink}
                      className="btn-warrior flex items-center gap-4 group"
                    >
                      {currentStep === steps.length ? "INITIATE THE BUILD" : "CONTINUE"}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <span className="text-[9px] tracking-[0.2em] font-ui text-white/20 uppercase hidden sm:inline ml-auto">
                      {currentStep === steps.length ? "[ Enter to Submit ]" : "[ Enter to Advance ]"}
                    </span>
                  </div>

                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-fb4 border border-metallic-brass/10 bg-metallic-brass/5 backdrop-blur-sm blade-motif max-w-2xl relative z-10 w-full"
                >
                  <div className="flex items-center gap-4 mb-fb4">
                    <div className="w-12 h-12 rounded-full border border-metallic-brass/40 flex items-center justify-center">
                      <Check className="text-metallic-brass w-6 h-6" />
                    </div>
                    <span className="text-[10px] tracking-[0.4em] font-ui text-metallic-brass uppercase">Message Sent</span>
                  </div>
                  <CelestialHeading 
                    text={"Thank You."}
                    as="h3"
                    fontSize={64}
                    className="text-4xl md:text-6xl mb-4"
                    intensity={0.8}
                  />
                  <p className="text-off-white/80 text-lg md:text-xl font-body leading-relaxed max-w-sm italic no-prose">
                    A member of our team will reach out to you soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>


        </div>
      </div>
    </section>
  );
}
