import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }
  return (
    <div className="relative flex h-screen flex-col items-center justify-center px-6 pt-24">
      {/* BACKGROUND IMAGE */}
      {restaurant.coverImageUrl && (
        <div className="absolute inset-0 z-0">
          <Image
            src={restaurant.coverImageUrl}
            alt="Cover"
            fill
            className="object-cover opacity-30 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>
      )}

      {/* CONTEÚDO */}
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        {/* LOGO */}
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-xl" />
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={120}
            height={120}
            className="relative z-10 rounded-full border-4 border-primary/20 shadow-2xl transition-transform hover:scale-110 hover:rotate-3"
            priority
          />
        </div>

        {/* TITULO */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{restaurant.name}</h2>
          <p className="mx-auto max-w-sm text-muted-foreground">
            {restaurant.description}
          </p>
        </div>

        {/* BEM VINDO */}
        <div className="space-y-2 pt-8">
          <h3 className="text-xl font-semibold">Como você quer aproveitar?</h3>
          <p className="text-sm text-muted-foreground">
            Escolha a melhor opção para você
          </p>
        </div>

        {/* OPCOES COM BOTOES MAIORES */}
        <div className="grid grid-cols-2 gap-6 pt-6">
          <ConsumptionMethodOption
            slug={slug}
            option="DINE_IN"
            buttonText="Comer aqui 🍽️"
            imageAlt="Comer no local"
            imageUrl="/dine_in.png"
          />
          <ConsumptionMethodOption
            slug={slug}
            option="TAKEAWAY"
            buttonText="Para levar 🥡"
            imageAlt="Para viagem"
            imageUrl="/takeaway.png"
          />
        </div>
      </div>

      {/* FOOTER */}
      <div className="absolute bottom-6 z-10 text-xs text-muted-foreground">
        © 2024 {restaurant.name}
      </div>
    </div>
  );
};

export default RestaurantPage;
