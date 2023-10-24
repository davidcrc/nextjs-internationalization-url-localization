import { LanguageSwitcher } from "@/components";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-24">
      <div className="text-white">{t("title")}</div>
      <LanguageSwitcher />
    </main>
  );
}
