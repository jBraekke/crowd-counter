function handleCurrentLanguage(currentLanguage: string) {
    if(currentLanguage === 'nb'){
        return "Switch to English";
    }
    else{
        return 'Switch to Norwegian'
    }

}

export default handleCurrentLanguage;
