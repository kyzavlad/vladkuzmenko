"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Shirt, Dumbbell, BookOpen, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";

// Icons + stable English keys (for the lead payload) line up by index with the
// localized product names in the dictionary.
const productIcons: LucideIcon[] = [Shirt, Shirt, Dumbbell, ShoppingBag, BookOpen];
const productKeys = ["Heavyweight Hoodie", "Oversized Tee", "Training Shorts", "Cap", "Execution Planner"];

function ProductCard({ i }: { i: number }) {
  const { t } = useI18n();
  const s = t.shop;
  const Icon = productIcons[i];
  const name = s.products[i];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      className="luxe-card overflow-hidden flex flex-col"
    >
      <div className="relative aspect-square flex items-center justify-center bg-gradient-to-br from-zinc-900 via-black to-black">
        <div
          className="absolute inset-0 opacity-50"
          style={{ background: "radial-gradient(circle at 50% 35%, rgba(212,175,55,0.12), transparent 60%)" }}
        />
        <Icon className="h-16 w-16 text-amber-400/80 relative z-10" />
        <span className="absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/70 border border-amber-400/30 text-amber-200">
          {s.preorderBadge}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[11px] uppercase tracking-wide text-gray-500 mb-1">Vlad Kuzmenko</p>
        <h3 className="font-semibold mb-4 flex-1">{name}</h3>
        <RequestDialog
          intent="shop_preorder"
          title={`${s.dialogTitlePrefix} ${name}`}
          description={s.dialogDesc}
          submitLabel={s.dialogSubmit}
          successTitle={s.dialogSuccessT}
          successMessage={s.dialogSuccessM}
          buttonLabel={`Shop reserve — ${productKeys[i]}`}
          showBuildType={false}
          helpLabel={s.helpLabel}
          helpPlaceholder={s.helpPh}
          helpRequired={false}
          context={{ product: `Vlad Kuzmenko ${productKeys[i]}` }}
        >
          <Button className="w-full premium-button">
            <ShoppingBag className="mr-2 h-4 w-4" />
            {s.preorder}
          </Button>
        </RequestDialog>
      </div>
    </motion.div>
  );
}

export function ShopDrop() {
  const { t } = useI18n();
  const s = t.shop;
  return (
    <section id="shop" className="section-accent relative py-24 md:py-32 bg-black border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <span className="premium-badge">{s.badge}</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-5 mb-5 tracking-tight">
            {s.titleA}
            <span className="gradient-gold-text">{s.titleB}</span>
          </h2>
          <p className="text-lg text-gray-400">{s.desc}</p>
          <p className="text-xs uppercase tracking-[0.18em] text-amber-300/70 mt-4">{s.status}</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          {productKeys.map((_, i) => (
            <ProductCard key={productKeys[i]} i={i} />
          ))}
        </div>

        {/* Drop access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-8 rounded-2xl p-7 bg-gradient-to-r from-amber-400/[0.08] to-transparent border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-center sm:text-left"
        >
          <div>
            <h3 className="font-semibold">{s.wantAccessTitle}</h3>
            <p className="text-sm text-gray-400">{s.wantAccessDesc}</p>
          </div>
          <RequestDialog
            intent="shop_preorder"
            title={s.accessDialogTitle}
            description={s.accessDialogDesc}
            submitLabel={s.accessSubmit}
            successTitle={s.accessSuccessT}
            successMessage={s.accessSuccessM}
            buttonLabel="Shop — Drop access"
            showBuildType={false}
            helpLabel={s.accessHelpLabel}
            helpRequired={false}
            context={{ product: "Drop access (general)" }}
            className="shrink-0"
          >
            <Button variant="outline" className="border-amber-400/40 text-amber-100 hover:bg-amber-400/10 w-full sm:w-auto">
              {s.requestAccess}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </RequestDialog>
        </motion.div>
      </div>
    </section>
  );
}
