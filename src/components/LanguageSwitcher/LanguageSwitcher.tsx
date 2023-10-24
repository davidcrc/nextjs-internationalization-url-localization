"use client";
import { usePathname } from "@/navigation";
import { useLocale } from "next-intl";
import { useRouter } from "next-intl/client";

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathName = usePathname();
  const locale = useLocale();

  const handleLanguageChange = (event: any) => {
    const locale = event.target.value;

    const cleanedPathName = pathName.startsWith("/")
      ? pathName
      : "/" + pathName;

    router.push(`/${cleanedPathName}`, {
      locale,
    });
  };

  return (
    <select onChange={handleLanguageChange} defaultValue={locale}>
      <option value="tr">Turkish</option>
      <option value="en">English</option>
    </select>
  );
};

export default LanguageSwitcher;
