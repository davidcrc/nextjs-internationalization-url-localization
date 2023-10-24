import React from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const Navigation = () => {
  const t = useTranslations("Navbar");
  const locale = useLocale();

  return (
    <div className="flex w-full items-center justify-between py-4 mx-auto text-white ">
      <Link href={"/"} locale={locale}>
        {t("main")}
      </Link>
      <Link href={"/abut"} locale={locale}>
        About
      </Link>
    </div>
  );
};

export default Navigation;
