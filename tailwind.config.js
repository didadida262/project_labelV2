const {
  default: flattenColorPalette,
} = require('tailwindcss/lib/util/flattenColorPalette');

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ':root': newVars,
  });
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/styles/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      textFirstSize: '20px',
      textSecondSize: '18px',
      textThirdSize: '16px',
      textFourthSize: '14px',
      textFifthSize: '13px',
      textSixSize: '12px',
    },
    extend: {
      fontFamily: {
        IBMPlexSans: ['Segoe UI'],
        Poppins: ['Poppins'],
        outfit: ['Outfit'],
      },
      colors: {
        // 文本
        // #FFFFFF
        textPrimaryColor: 'var(--text-primary-color)',
        // #D1D5DA
        textSecondColor: 'var(--text-second-color)',
        // #E1E4E8
        textThirdColor: 'var(--text-third-color)',
        // #D1D5DA
        textFourthColor: 'var(--text-fourth-color)',
        // #959DA5
        textFifthColor: 'var(--text-fifth-color)',
        // #CED3DB
        textSixColor: 'var(--text-sixth-color)',
        // #95A0AB
        textSevenColor: 'var(--text-seventh-color)',
        // #D77915
        textEightColor: 'var(--text-eight-color)',
        // #D1D5DAB2
        textNineColor: 'var(--text-nine-color)',

        // ===================================
        // ===================================
        // ===================================
        'gray-transparent': 'rgba(255, 255, 255, 0.04)',
        'white-5': 'rgba(255, 255, 255, 0.05)',
        themeBtnBgColor: 'var(--theme-btn-bg-color)',
        textProjectStatusProjectColor: 'var(--text-project-logo-project-color)',
        textCardInfoColor: 'var(--text-cardInfo-color)',
        bgtoastSuccessContainer: 'var(--bg-toastcontainer-success-color)',
        themeColor: 'var(--theme-color)',

        themeColorHeavy: 'var(--theme-color-heavy)',
        textBlackAndWhite: 'var(--text-black-white-color)',
        textWhiteAndBlack: 'var(--text-white-black-color)',

        textSecondaryColor: 'var(--text-secondary-color)',
        textTertiaryColor: 'var(--text-tertiary-color)',
        textQuaternaryColor: 'var(--text-quaternary-color)',
        textLiColor: 'var(--text-li-color)',

        // 背景
        // #121416
        bgPrimaryColor: 'var(--bg-primary-color)',
        // #2D343E
        bgSecondColor: 'var(--bg-secondary-color)',
        // #202329
        bgThirdColor: 'var(--bg-third-color)',
        // #146EF5
        bgFourthColor: 'var(--bg-fourth-color)',
        // #1AB13F
        bgFifthColor: 'var(--bg-fifth-color)',
        // #0366D6
        bgSixColor: 'var(--bg-six-color)',
        // #252629
        bgSevenColor: 'var(--bg-seven-color)',
        // #25272D
        bgEightColor: 'var(--bg-eight-color)',
        // #D779150D;
        bgNineColor: 'var(--bg-nine-color)',
        // #141519
        bgTenColor: 'var(--bg-ten-color)',
        // #000000
        bgElevenColor: 'var(--bg-eleven-color)',

        // ==========
        // ==========
        // ==========
        bgCardBtnColor: 'var(--bg-cardInfo-btn-color)',
        bgProjectCardLogolor: 'var(--bg-projectcard-logo-color)',
        bgProjectCardStatusColor: 'var(--bg-projectcard-color)',
        bgProjectCardStatus2Color:
          'var(--bg-projectcard-status-template-color)',
        bgGrayAndBlackColor: 'var(--bg-gray-black-color)',
        bgPrimaryContentColor: 'var(--bg-primary-content-color)',
        bgHeaderColor: 'var(--bg-header-color)',
        bgProjectCardColor: 'var(--bg-project-card-color)',
        bgTemplateCardColor: 'var(--bg-template-card-color)',
        bgHoverProjectCardColor: 'var(--bg-hover-project-card-color)',
        bgCreateProjectCardColor: 'var(--bg-create-project-card-color)',
        bgBoxModuleColor: 'var(--bg-box-module-color)',
        bgInputColor: 'var(--bg-input-color)',
        bgTagFilterColor: 'var(--bg-tagFilter-color)',
        bgLinkHoverColor: 'var(--bg-ul-hover-color2)',
        bgUlColor: 'var(--bg-ul-color2)',
        bgLinkColor: 'var(--bg-link-color)',
        bgLinkColor2: '#202329',
        bgHeaderColor2: 'var(--bg-header-bg-color2)',

        bgSecondaryColor: 'var(--bg-secondary-color)',
        bgTertiaryColor: 'var(--bg-tertiary-color)',
        bgDropdownHoverColor: 'var(--bg-dropdown-hover-color)',
        bgHoverCardColor: 'var(--bg-hover-card-color)',

        // borderUlColor2: 'var(--border-ul-color)',

        cardBorderColor: 'var(--card-border-color)',
        projectCardBoarderColor: 'var(--project-card-border-color)',
        headerBorderColor: 'var(--header-border-color)',
        templateCardBorderColor: 'var(--template-card-border-color)',
        splitLineColor: 'var(--split-line-color)',

        // border===============
        // ===============
        // ===============
        // #262B33
        borderFirstColor: 'var(--border-first-color)',
        // #383B45
        borderSecondColor: 'var(--border-second-color)',
        // #D7791599
        borderThirdColor: 'var(--border-third-color)',
        // #4A4F59
        borderFourColor: 'var(--border-four-color)',

        borderUlColor: 'var(--ul-card-border-color)',
        borderProjectCardStatusTemplateColor:
          'var(--border-projectcard-status-template-color)',
        borderHoverCardColor: 'var(--border-hover-card-color)',
        borderBtnSecondColor: 'var(--border-btn-second-color)',
      },
      borderRadius: {
        common: 'var(--radius-common)',
      },
      screens: {
        xs: '300px',
        // => @media (min-width: 400px) { ... }

        sm: '640px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '1xl': '1380px',
        // => @media (min-width: 1380px) { ... }
        '2xl': '1440px',
        // => @media (min-width: 1440x820px) { ... }
        '3xl': '1920px',
        // '3xl': '1920x1080'
        // => @media (min-width: 1920px) { ... }
        '4xl': '3840px',
        // => @media (min-width: 3840x2160px) { ... }
      },
      boxShadow: {
        common: '0px 0px 10px 0px rgba(0,0,0,0.30)',
      },
    },
  },
  plugins: [addVariablesForColors],
};
