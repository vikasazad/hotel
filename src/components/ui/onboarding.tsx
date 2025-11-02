"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "./button";

interface OnboardingStep {
  id: string;
  targetSelector: string;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right";
}

interface OnboardingProps {
  steps: OnboardingStep[];
  onComplete?: () => void;
  onSkip?: () => void;
}

export default function Onboarding({
  steps,
  onComplete,
  onSkip,
}: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 for welcome screen
  const [highlightedElement, setHighlightedElement] = useState<DOMRect | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);

  const updateHighlight = useCallback(() => {
    if (currentStep < 0 || currentStep >= steps.length) return;

    const targetElement = document.querySelector(
      steps[currentStep].targetSelector
    );
    if (targetElement) {
      // Scroll element into view if needed
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });

      // Wait for scroll to complete before updating highlight
      setTimeout(() => {
        const rect = targetElement.getBoundingClientRect();
        setHighlightedElement(rect);
      }, 300);
    }
  }, [currentStep, steps]);

  useEffect(() => {
    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    window.addEventListener("scroll", updateHighlight);

    return () => {
      window.removeEventListener("resize", updateHighlight);
      window.removeEventListener("scroll", updateHighlight);
    };
  }, [updateHighlight]);

  const handleNext = () => {
    if (showWelcome) {
      setShowWelcome(false);
      setCurrentStep(0);
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    console.log("Skip is clicked");
    setIsVisible(false);
    if (onSkip) {
      onSkip();
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    if (onComplete) {
      onComplete();
    }
  };

  if (!isVisible) return null;

  const step = currentStep >= 0 ? steps[currentStep] : null;

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        {/* Skip Button */}
        <Button
          variant="outline"
          className="absolute top-4 right-4 z-[70] bg-white font-semibold px-6"
          onClick={handleSkip}
          size="sm"
        >
          SKIP
        </Button>

        {/* Welcome Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md">
          <div className="space-y-4 text-center">
            <div className="text-3xl mb-2">👋</div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome Home!</h2>
            <p className="text-gray-600 text-base leading-relaxed">
              We&apos;re delighted to have you here. Let us show you around so
              you can relax and enjoy every moment of your stay with ease.
            </p>
            <Button
              onClick={handleNext}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-6 text-base rounded-xl mt-6"
            >
              SHOW ME AROUND
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep >= steps.length) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* SVG Mask for Cutout with Red Overlay */}
      {highlightedElement && (
        <svg
          className="absolute inset-0 pointer-events-none z-[51]"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <mask id="onboarding-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={highlightedElement.left - 2}
                y={highlightedElement.top - 2}
                width={highlightedElement.width + 4}
                height={highlightedElement.height + 4}
                rx="12"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#f9f9f9"
            fillOpacity="0.7"
            mask="url(#onboarding-mask)"
          />
        </svg>
      )}

      {/* Skip Button - Top Right, Above Overlay */}
      <Button
        variant="outline"
        className="absolute top-4 right-4 z-[70] bg-white  font-semibold px-6"
        onClick={handleSkip}
        size="sm"
      >
        SKIP
      </Button>

      {/* Instruction Card */}
      {highlightedElement && step !== null && (
        <div
          className="absolute z-[60] bg-white rounded-2xl p-6 shadow-2xl w-[90%] max-w-sm mx-auto"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top:
              highlightedElement.bottom + 20 < window.innerHeight - 250
                ? highlightedElement.bottom + 20
                : highlightedElement.top > 250
                  ? highlightedElement.top - 230
                  : window.innerHeight - 240,
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{step!.title}</h3>
              <span className="text-sm text-gray-500 font-medium">
                {currentStep + 1}/{steps.length}
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {step!.description}
            </p>
            <Button
              onClick={handleNext}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-6 text-base rounded-xl"
            >
              {currentStep < steps.length - 1 ? "NEXT →" : "GET STARTED"}
            </Button>
          </div>
        </div>
      )}

      {/* Progress Dots */}
      {/* <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-[60]">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentStep
                ? "w-8 bg-white"
                : index < currentStep
                  ? "w-2 bg-white/70"
                  : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}
