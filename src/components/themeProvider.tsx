/*
 * @Description:
 * @Author: didadida262
 * @Date: 2024-04-23 11:19:35
 * @LastEditors: didadida262
 * @LastEditTime: 2024-07-18 15:09:47
 */
import React, { createContext, useEffect, useState } from 'react';

export enum ThemeMode {
  DARK_MODE = 'Dark Mode',
  LIGHT_MODE = 'Light Mode',
}

const darkModeStyles = [
  // 通用色彩
  { key: '--theme-btn-bg-color', value: '#0366D6' },

  /* 字体色 */
  { key: '--text-project-logo-project-color', value: '#85e89d' },
  { key: '--text-cardInfo-color', value: '#D1D5DA' },
  { key: '--text-primary-color', value: '#FFFFFF' },
  { key: '--text-second-color', value: '#D1D5DA' },
  { key: '--text-third-color', value: '#E1E4E8' },
  { key: '--text-fourth-color', value: '#D1D5DA' },
  { key: '--text-fifth-color', value: '#959DA5' },
  { key: '--text-sixth-color', value: '#CED3DB' },
  { key: '--text-seventh-color', value: '#95A0AB' },
  { key: '--text-eight-color', value: '#D77915' },
  { key: '--text-nine-color', value: '#D1D5DAB2' },

  { key: '--text-secondary-color', value: '#7f7f7f' },
  { key: '--text-tertiary-color', value: '#e1e4e8' },
  { key: '--text-quaternary-color', value: '#ffffff' },
  { key: '--text-li-color', value: '#318CE9' },
  { key: '--text-black-white-color', value: '#19181A' },
  { key: '--text-white-black-color', value: '#D1D5DA' },

  /* 背景色 */
  { key: '--bg-cardInfo-btn-color', value: '#0366D6' },
  { key: '--bg-toastcontainer-success-color', value: '#1C2024' },
  { key: '--bg-projectcard-logo-color', value: '#383e41' },
  { key: '--bg-projectcard-status-template-color', value: '#3D403C' },
  { key: '--bg-projectcard-color', value: '#1D372C' },
  { key: '--bg-secondary-color', value: '#2D343E' },
  { key: '--bg-third-color', value: '#202329' },
  { key: '--bg-fourth-color', value: '#146EF5' },
  { key: '--bg-fifth-color', value: '#1AB13F' },
  { key: '--bg-six-color', value: '#0366D6' },
  { key: '--bg-seven-color', value: '#252629' },
  { key: '--bg-eight-color', value: '#25272D' },
  { key: '--bg-nine-color', value: '#D779150D' },
  { key: '--bg-ten-color', value: '#141519' },
  { key: '--bg-eleven-color', value: '#000000' },

  { key: '--bg-gray-black-color', value: '#212931' },
  { key: '--bg-primary-color', value: '#121416' },
  { key: '--bg-primary-content-color', value: '#060708CC' },
  { key: '--bg-project-card-color', value: '#131519' },
  { key: '--bg-hover-project-card-color', value: '#1a1c1f' },
  { key: '--bg-template-card-color', value: '#1A1C21' },
  // { key: '--bg-hover-template-card-color', value: '#1a1c1f' },
  // background: #060708CC;

  { key: '--bg-create-project-card-color', value: '#0d8ce91a' },
  { key: '--bg-box-module-color', value: '#282e34' },
  { key: '--bg-input-color', value: '#141518' },
  { key: '--bg-tagFilter-color', value: '#2f363d66' },
  { key: '--bg-skeleton-loading-color', value: '#171821' },
  { key: '--bg-ul-color', value: '#2D343E' },
  { key: '--bg-ul-color2', value: '#141519' },
  { key: '--bg-ul-hover-color2', value: '#1d2024' },
  { key: '--bg-link-color', value: '#3272c7' },
  { key: '--bg-link-hover-color', value: '#3D4755' },
  { key: '--bg-header-color2', value: '#191D21' },
  // background: linear-gradient(0deg, #1A1C21, #1A1C21),
  // linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04));
  // 打点
  { key: '--bg-hover-card-color', value: '#2e353d' },

  /* 边框色 */

  { key: '--border-first-color', value: '#262B33' },
  { key: '--border-second-color', value: '#383B45' },
  { key: '--border-third-color', value: '#D7791599' },
  { key: '--border-four-color', value: '#4A4F59' },

  { key: '--border-btn-second-color', value: '#454545' },
  { key: '--border-hover-card-color', value: '#005CC5' },
  { key: '--border-projectcard-status-template-color', value: '#8B8457' },
  { key: '--project-card-border-color', value: '#23252A' },
  { key: '--header-border-color', value: '#cccccc21' },
  { key: '--template-card-border-color', value: '#2E3844' },
  { key: '--ul-card-border-color', value: '#2c3243' },
];
const lightModeStyles = [
  // 通用色彩
  { key: '--theme-btn-bg-color', value: '#2188FF' },

  /* 字体色 */
  { key: '--text-project-logo-project-color', value: '#22863a' },
  { key: '--text-cardInfo-btn-color', value: '#0366D6' },
  { key: '--text-cardInfo-color', value: '#444D56' },
  { key: '--text-primary-color', value: '#525253' },
  { key: '--text-second-color', value: '#D1D5DA' },
  { key: '--text-third-color', value: '#E1E4E8' },
  { key: '--text-fourth-color', value: '#D1D5DA' },
  { key: '--text-fifth-color', value: '#959DA5' },
  { key: '--text-sixth-color', value: '#CED3DB' },
  { key: '--text-seventh-color', value: '#95A0AB' },
  { key: '--text-eight-color', value: '#D77915' },
  { key: '--text-nine-color', value: '#D1D5DAB2' },

  { key: '--text-secondary-color', value: '#7f7f7f' },
  { key: '--text-tertiary-color', value: '#19181A' },
  { key: '--text-quaternary-color', value: '#19181A' },
  { key: '--text-li-color', value: '#0D8CE9' },
  { key: '--text-black-white-color', value: 'white' },
  { key: '--text-white-black-color', value: '#19181A' },

  /* 背景色 */
  { key: '--bg-cardInfo-btn-color', value: '#2188FF' },
  { key: '--bg-toastcontainer-success-color', value: '#ffffff' },
  { key: '--bg-projectcard-logo-color', value: '#D9DBDD' },
  { key: '--bg-projectcard-status-template-color', value: '#E6DFD8' },
  { key: '--bg-projectcard-color', value: '#D4E0D2' },
  { key: '--bg-secondary-color', value: '#D0E3F1' },
  { key: '--bg-third-color', value: '#202329' },
  { key: '--bg-fourth-color', value: '#146EF5' },
  { key: '--bg-fifth-color', value: '#1AB13F' },
  { key: '--bg-six-color', value: '#0366D6' },
  { key: '--bg-seven-color', value: '#252629' },
  { key: '--bg-eight-color', value: '#25272D' },
  { key: '--bg-nine-color', value: '#D779150D' },
  { key: '--bg-ten-color', value: '#141519' },
  { key: '--bg-eleven-color', value: '#FFFFFF' },

  { key: '--bg-gray-black-color', value: '#E4E7E9' },
  { key: '--bg-primary-color', value: '#F0F1F2' },
  { key: '--bg-primary-content-color', value: '#0F1114' },

  { key: '--bg-header-color', value: '#E3E8EB' },
  { key: '--bg-project-card-color', value: '#1A1C21' },
  { key: '--bg-template-card-color', value: '#1A1C21' },
  { key: '--bg-hover-project-card-color', value: '#0366D614' },
  { key: '--bg-create-project-card-color', value: '#D0E3F1' },
  { key: '--bg-box-module-color', value: '#DDE0E480' },
  { key: '--bg-input-color', value: '#E3E5E7' },
  { key: '--bg-tagFilter-color', value: '#E3E5E780' },
  { key: '--bg-skeleton-loading-color', value: '#5a5d5e4f' },
  { key: '--bg-ul-color', value: '#E1E4E8' },
  { key: '--bg-ul-color2', value: '#141519' },
  { key: '--bg-ul-hover-color2', value: '#1d2024' },
  { key: '--bg-link-color', value: '#CCE5FF' },
  { key: '--bg-link-hover-color', value: '#ffffff' },
  { key: '--bg-header-color2', value: '#E3E8EB' },
  { key: '--bg-hover-card-color', value: '#ddeaf3' },

  /* 边框色 */
  { key: '--border-first-color', value: '#262B33' },
  { key: '--border-btn-second-color', value: '#C8C8C8' },
  { key: '--border-hover-card-color', value: '#2188FF' },
  { key: '--border-projectcard-status-template-color', value: '#d77915' },
  { key: '--border-second-color', value: '#383B45' },
  { key: '--border-third-color', value: '#D7791599' },
  { key: '--border-four-color', value: '#4A4F59' },

  { key: '--project-card-border-color', value: '#23252A' },
  { key: '--header-border-color', value: '#D0D8DE' },
  { key: '--template-card-border-color', value: '#C9CFD7' },
  { key: '--ul-card-border-color', value: 'ghostwhite' },
];

interface ThemeContext {
  currentTheme: ThemeMode;
  setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeMode>>;
}

interface PropsType {
  children?: JSX.Element;
}

export const ThemeContext = createContext({} as ThemeContext);

export const ThemeProvider = (props: PropsType) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(
    ThemeMode.DARK_MODE,
  );

  useEffect(() => {
    console.log({ currentTheme });
    if (currentTheme === ThemeMode.LIGHT_MODE) {
      lightModeStyles.forEach((item) =>
        document.documentElement.style.setProperty(item.key, item.value),
      );
    }
    if (currentTheme === ThemeMode.DARK_MODE) {
      darkModeStyles.forEach((item) =>
        document.documentElement.style.setProperty(item.key, item.value),
      );
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setCurrentTheme,
      }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
