"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  CheckCircle,
  ShoppingCart,
  Star,
  Users,
  Trophy,
  Zap,
  BookOpen,
  Target,
  Brain,
  Rocket,
  TrendingUp,
  Award,
  DollarSign,
  Clock,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { SmartRecommendation } from "./SmartRecommendation";
import { useCart } from "../context/cart-context";
import { useToast } from "../hooks/use-toast";

// Кампусы — без жёстких сроков, только фокус
const campuses = [
  {
    title: "AI & Automation Mastery",
    description:
      "Собираем рабочие AI-системы: агенты, звонки, автоворонки, интеграции с n8n и сервисами.",
    icon: <Zap className="h-8 w-8 text-[#D4AF37]" />,
    modules: "15+ практических модулей",
    format: "Self-paced, с регулярными обновлениями",
  },
  {
    title: "Content Creation Empire",
    description:
      "Короткий и длинный контент под деньги: структура роликов, сценарии, монтаж, виральность.",
    icon: <Target className="h-8 w-8 text-[#D4AF37]" />,
    modules: "12+ модулей по контенту",
    format: "Практика + готовые шаблоны",
  },
  {
    title: "Sales Psychology",
    description:
      "Как продавать свои услуги/продукты: офферы, скрипты, возражения, закрытие на деньги.",
    icon: <Trophy className="h-8 w-8 text-[#D4AF37]" />,
    modules: "10+ модулей по продажам",
    format: "Реальные фреймворки, не теория",
  },
  {
    title: "E-commerce Domination",
    description:
      "Стратегия для магазинов: выбор ниш, креативы, трафик, аналитика и масштабирование.",
    icon: <ShoppingCart className="h-8 w-8 text-[#D4AF37]" />,
    modules: "15+ модулей для магазинов",
    format: "Фокус на прибыль, а не трафик ради трафика",
  },
  {
    title: "Warrior Mindset",
    description:
      "Дисциплина, режим, тело, голова. Как не сливать энергию и держать фокус на деле.",
    icon: <BookOpen className="h-8 w-8 text-[#D4AF37]" />,
    modules: "Практические протоколы и чек-листы",
    format: "Жизнь + гормоны + нервная система",
  },
  {
    title: "Wealth Building",
    description:
      "Деньги после первых результатов: управление кэшем, риск, защита, долгий горизонт.",
    icon: <Users className="h-8 w-8 text-[#D4AF37]" />,
    modules: "Базовая структура по капиталу",
    format: "Без финсоветов, только рамки мышления",
  },
];

// Путь ученика
const journeySteps = [
  {
    phase: "Start",
    icon: <BookOpen className="w-6 h-6" />,
    title: "Определяем точку А",
    description: "Ты выбираешь кампус и формат: учиться, строить систему или оба.",
    features: ["Карта пути", "Доступ ко всем материалам", "Стартовое задание"],
  },
  {
    phase: "Build",
    icon: <Rocket className="w-6 h-6" />,
    title: "Собираем рабочую систему",
    description:
      "Ты внедряешь уроки в реальный проект: агентство, магазин, личный бренд.",
    features: ["Шаблоны и скрипты", "Технические разборы", "Обратная связь в чате"],
  },
  {
    phase: "Scale",
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Масштабируем результат",
    description:
      "После первых денег усиливаем трафик, автоматизацию и делегирование.",
    features: ["Продвинутые стратегии", "Кейсы из практики", "Подходы к найму"],
  },
  {
    phase: "Network",
    icon: <Award className="w-6 h-6" />,
    title: "Окружение и новые уровни",
    description:
      "Подключаешься к Warriors Team и двигаешься вместе с теми, кто тоже строит.",
    features: ["Закрытые созвоны", "Сильное окружение", "Совместные цели"],
  },
];

// Бенефиты платформы
const platformBenefits = [
  {
    icon: <Brain className="w-8 h-8 text-amber-400" />,
    title: "Практика вместо теории",
    description:
      "Материалы идут из реальных систем: агентство, контент, автоматизация клиентов.",
  },
  {
    icon: <Clock className="w-8 h-8 text-amber-400" />,
    title: "Гибкий формат",
    description:
      "Уроки в записи + обновления. Можно проходить в своём темпе и возвращаться к материалам.",
  },
  {
    icon: <Users className="w-8 h-8 text-amber-400" />,
    title: "Комьюнити",
    description:
      "Закрытый чат и созвоны — не остаёшься один на один с теорией.",
  },
  {
    icon: <Shield className="w-8 h-8 text-amber-400" />,
    title: "Прозрачный оффер",
    description:
      "Никаких «гарантий миллионов». Есть система, работа и честные ожидания.",
  },
];

// Адекватные статсы
const successStats = [
  {
    value: "10+",
    label: "реальных систем",
    description: "AI-агенты, автоворонки и контент-пайплайны",
  },
  {
    value: "100+",
    label: "уроков и разборов",
    description: "по AI, контенту, продажам и e-commerce",
  },
  {
    value: "47+",
    label: "стран",
    description: "где есть ученики и клиенты",
  },
  {
    value: "24/7",
    label: "доступ",
    description: "к платформе и материалам",
  },
];

export const EducationPlatformSection = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedCampus, setSelectedCampus] = useState(0);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const { toast } = useToast();

  const theUniversityProduct = {
    id: "university-membership-monthly",
    name: "The University – Monthly",
    price: 49.0,
    image: "/university-preview.jpg",
  };

  const handleAddToCart = () => {
    addToCart({
      ...theUniversityProduct,
      quantity: 1,
    });

    toast({
      title: "Added to cart",
      description: "The University – Monthly membership ($49)",
      duration: 3000,
    });

    setIsCartOpen(true);
  };

  return (
    <section
      id="education"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Фон */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-[#D4AF37] to-transparent blur-3xl" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-radial from-[#B8860B] to-transparent blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Заголовок */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              THE <span className="gold-gradient">UNIVERSITY</span>
            </h2>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              Не классическое образование, а{" "}
              <span className="font-bold text-foreground">
                система навыков вокруг денег и свободы
              </span>
              .
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Кампусы по AI, контенту, продажам, e-commerce и мышлению. Всё
              построено вокруг реальных проектов, а не презентаций.
            </p>

            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowRecommendation(true)}
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <Brain className="mr-2 h-4 w-4" />
                Pick the right campus for me
              </Button>
            </div>
          </motion.div>

          {/* Journey */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32"
          >
            <h3 className="text-3xl font-bold text-center mb-16">
              Как ты двигаешься внутри{" "}
              <span className="gradient-gold-text">The University</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {journeySteps.map((step, index) => (
                <motion.div
                  key={step.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center font-bold text-black text-lg z-10">
                    {index + 1}
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 hover:border-amber-400/50 transition-all duration-300 h-full">
                    <div className="w-12 h-12 bg-amber-400/10 rounded-lg flex items-center justify-center mb-4 text-amber-400">
                      {step.icon}
                    </div>

                    <span className="text-sm text-amber-400 font-medium">
                      {step.phase}
                    </span>
                    <h4 className="text-xl font-bold mt-2 mb-3">
                      {step.title}
                    </h4>
                    <p className="text-gray-400 mb-4">{step.description}</p>

                    <ul className="space-y-2">
                      {step.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm text-gray-300"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Статистика */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {successStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold gradient-gold-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Кампусы */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
            <div className="space-y-4">
              {campuses.map((campus, index) => (
                <motion.div
                  key={campus.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCampus(index)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 hover-lift ${
                    selectedCampus === index
                      ? "bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/10 border-[#D4AF37]/50"
                      : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{campus.icon}</div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">
                        {campus.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">
                        {campus.description}
                      </p>
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="text-[#D4AF37]">
                          {campus.modules}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400">{campus.format}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Превью-карточка */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="sticky top-20 bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-2xl p-8 border border-zinc-800 premium-shadow"
            >
              <div className="mb-6">
                {campuses[selectedCampus].icon}
              </div>
              <h3 className="text-3xl font-bold mb-4">
                {campuses[selectedCampus].title}
              </h3>
              <p className="text-gray-300 mb-6">
                {campuses[selectedCampus].description}
              </p>

              <div className="space-y-3 mb-8 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Доступ ко всем кампусам в одном членстве</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Регулярные обновления и новые уроки</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Закрытое сообщество и созвоны</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Шаблоны, скрипты и чек-листы под внедрение</span>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-gray-400">/month</span>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black glow-effect"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Join The University – $49/month
              </Button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Оплата через Payoneer или PayPal. Можно отменить в любой момент.
              </p>
            </motion.div>
          </div>

          {/* Бенефиты */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h3 className="text-3xl font-bold text-center mb-12">
              Почему ребята выбирают{" "}
              <span className="gradient-gold-text">The University</span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {platformBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400/10 rounded-full mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Финальный CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-[#D4AF37]/10 to-[#B8860B]/10 rounded-2xl p-12 border border-[#D4AF37]/20"
          >
            <h3 className="text-4xl font-bold mb-4">
              Хочешь не мотивацию, а систему?
            </h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Вход в The University — это доступ к тем же принципам и
              пайплайнам, на которых строится агентство и твой личный бренд.
            </p>
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black px-12 py-6 text-lg glow-effect"
                onClick={handleAddToCart}
              >
                Get Instant Access – $49/month
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Модал рекомендаций */}
      {showRecommendation && (
        <SmartRecommendation
          onClose={() => setShowRecommendation(false)}
          onSelect={(index) => {
            setSelectedCampus(index);
            setShowRecommendation(false);
          }}
        />
      )}
    </section>
  );
};
