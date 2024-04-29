import React, { useState, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import LanguageIcon from "@mui/icons-material/Language";
import CircularProgress from "@mui/material/CircularProgress";

interface Locales {
  [key: string]: { title: string };
}

const locales: Locales = {
  en: { title: "English" },
  es: { title: "Español" },
  fr: { title: "French" },
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (event: MouseEvent<HTMLElement>) => {
    setIsSwitching(true);
    setAnchorEl(null);
    const currentLocale = event.currentTarget.getAttribute("data-locale");
    if (currentLocale) {
      await i18n.changeLanguage(currentLocale);
    }
    setIsSwitching(false);
  };

  if (isSwitching) {
    return <CircularProgress />;
  }

  return (
    <div style={{ marginLeft: "auto" }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          color: "#ffffff",
          textDecoration: "none",
          marginLeft: "30px",
          fontSize: "1.15rem",
          paddingBottom: "1rem",
          borderBottom: "10px solid transparent",
          "&:hover": {
            borderBottom: "7px solid #D90166",
          },
        }}
      >
        <LanguageIcon sx={{ mr: 1 }} />
        {locales[i18n.language]?.title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Object.keys(locales).map((locale) => (
          <MenuItem
            onClick={handleClose}
            key={locale}
            data-locale={locale}
            sx={{
              fontWeight: i18n.language === locale ? "bold" : "normal",
            }}
          >
            {locales[locale]?.title}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}