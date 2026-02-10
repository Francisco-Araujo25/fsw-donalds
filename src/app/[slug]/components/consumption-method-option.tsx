"use client";

import { ConsumptionMethod } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConsumptionMethodOptionProps {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
}

const ConsumptionMethodOption = ({
  slug,
  imageAlt,
  imageUrl,
  buttonText,
  option,
}: ConsumptionMethodOptionProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Card
      className={`
        relative overflow-hidden transition-all duration-300
        ${isPressed ? "scale-95 shadow-inner" : ""}
        ${isHovered ? "shadow-xl border-primary/30" : "hover:shadow-lg"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* EFEITO DE GRADIENTE NO HOVER */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      )}
      
      <CardContent className="flex flex-col items-center gap-4 py-6">
        {/* IMAGEM COM ANIMAÇÃO */}
        <div
          className={`
            relative h-[80px] w-[80px] transition-all duration-300
            ${isHovered ? "scale-110" : ""}
          `}
        >
          <Image
            src={imageUrl}
            fill
            alt={imageAlt}
            className={`
              object-contain transition-transform duration-300
              ${isHovered ? "rotate-3" : ""}
            `}
          />
        </div>

        {/* BOTAO */}
        <Button
          variant="secondary"
          className={`
            rounded-full transition-all duration-300
            ${isHovered ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}
            ${isPressed ? "scale-95" : ""}
          `}
          asChild
        >
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>

      {/* INDICADOR INFERIOR */}
      <div
        className={`
          absolute bottom-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-primary transition-all duration-300
          ${isHovered ? "w-16 opacity-100" : "opacity-0"}
        `}
      />
    </Card>
  );
};

export default ConsumptionMethodOption;
