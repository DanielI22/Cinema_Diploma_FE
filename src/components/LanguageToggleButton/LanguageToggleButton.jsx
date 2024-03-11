import { useTranslation } from 'react-i18next';
import bgFlag from '../../assets/flags/bg.svg';
import enFlag from '../../assets/flags/en.svg';
import styles from './LanguageToggleButton.module.css';

const LanguageToggleButton = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === 'en' ? 'bg' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <button onClick={toggleLanguage} className={styles.toggleButton}>
      <img
        src={i18n.language === 'en' ? enFlag : bgFlag}
        alt="flag"
        className={styles.flagIcon}
      />
      {i18n.language.toUpperCase()}
    </button>
  );
};

export default LanguageToggleButton;