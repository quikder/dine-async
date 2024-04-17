import i18n from "i18next";
import es from "./es.json";

const resources = {
	es: {
		translation: es,
	},
	// en: {
	// 	translation: en,
	// },
};

i18n.init({
	compatibilityJSON: "v3",
	interpolation: { escapeValue: false },
	resources,
	supportedLngs: ["en", "es"],
	lng: "es",
	fallbackLng: "en",
	ns: ["translation"],
	defaultNS: "translation",
	debug: false,
});

export default i18n;
