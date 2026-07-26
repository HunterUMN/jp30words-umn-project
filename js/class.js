class jp30Test{
    constructor(){
        this.gameState = 0; //0 = no game; 1 = guessing; 2 = gameover.
        this.testType = 0;  //0 = Nouns; 1 = Adjectives; 2 = Verbs; 3 = All
        this.wordCount = 0; //10 = normal game; 30 = all
        this.correct = 0;   //number of correct answers
        this.wrong = 0;     //number of incorrect answers

        /*Four arrays that are 'get' from during the guessing game. They are always in the same order.*/
        this.words = [];
        this.wordsHira = [];
        this.wordsHint = [];
        this.wordsAnswer = [];

        /*The order of appearance of each card in the guessing game.
        Later set using shuffle function to make it random: (1, 2, 3...) -> (7, 4, 1...)*/
        this.order = [];
    }

    shuffleDeck(amount){
        //Fills and array with each increment [0, 1, 2... amount]
        let newArray = []
        for (let i = 0; i < amount; i++){
            newArray[i] = i;
        }
        //Swaps the order of each number.
        for (let i = 0; i < amount; i++){
            let swapIndex = Math.floor(Math.random() * amount);
            let tempValue = newArray[i];
            newArray[i] = newArray[swapIndex];
            newArray[swapIndex] = tempValue;
        }
        return newArray;
    }

    newGame(){
        /* Sets test for the new game */
        switch (this.testType){
            case 0://Nouns
                this.wordCount = 10;
                this.words = ["学校","先生","英語","水","川","手","仕事","年","雨","時間"];
                this.wordsHira = ["がっこう","せんせい","えいご","みず","かわ","て","しごと","とし","あめ","じかん"];
                this.wordsHint = ["School","Teacher","English","Water","River","Hand","Work","Year","Rain","Time"];
                this.wordsAnswer = ["Gakkou","Sensei","Eigo","Mizu","Kawa","Te","Shigoto","Toshi","Ame","Jikan"];
                break;
            case 1://Verbs
                this.wordCount = 10;
                this.words = ["話す","買う","読む","出る","取る","待つ","行く","有る","言う","見る"];
                this.wordsHira = ["はなす","かう","よむ","でる","とる","まつ","いく","ある","いう","みる"];
                this.wordsHint = ["To talk","To buy","To read","To leave","To take","To wait","To go","To be","To say","To see"];
                this.wordsAnswer = ["Hanasu","Kau","Yomu","Deru","Toru","Matsu","Iku","Aru","Iu","Miru"];
                break;
            case 2://Adjectives
                this.wordCount = 10;
                this.words = ["大きい","長い","高い","難しい","良い","新しい","大変","後ろ","忙しい","可愛い"];
                this.wordsHira = ["おおきい","ながい","たかい","むずかしい","よい","あたらしい","たいへん","うしろ","いそがしい","かわいい"];
                this.wordsHint = ["Big","Long","Tall","Difficult","Good","New","Very","Back","Busy","Cute"];
                this.wordsAnswer = ["Ookii","Nagai","Takai","Muzukashii","Yoi","Atarashii","Taihen","Ushiro","Isogashii","Kawaii"];
                break;
            case 3://JP30Words
                this.wordCount = 30;
                this.words = ["学校","先生","英語","水","川","手","仕事","年","雨","時間","話す","買う","読む","出る","取る","待つ","行く","有る","言う","見る","大きい","長い","高い","難しい","良い","新しい","大変","後ろ","忙しい","可愛い"];
                this.wordsHira = ["がっこう","せんせい","えいご","みず","かわ","て","しごと","とし","あめ","じかん","はなす","かう","よむ","でる","とる","まつ","いく","ある","いう","みる","おおきい","ながい","たかい","むずかしい","よい","あたらしい","たいへん","うしろ","いそがしい","かわいい"];
                this.wordsHint = ["School","Teacher","English","Water","River","Hand","Work","Year","Rain","Time","To talk","To buy","To read","To leave","To take","To wait","To go","To be","To say","To see","Big","Long","Tall","Difficult","Good","New","Very","Back","Busy","Cute"];
                this.wordsAnswer = ["Gakkou","Sensei","Eigo","Mizu","Kawa","Te","Shigoto","Toshi","Ame","Jikan","Hanasu","Kau","Yomu","Deru","Toru","Matsu","Iku","Aru","Iu","Miru","Ookii","Nagai","Takai","Muzukashii","Yoi","Atarashii","Taihen","Ushiro","Isogashii","Kawaii"];
                break;
            default:
                break;
        }
        console.log(this.words);
        console.log(this.wordsHira);
        console.log(this.wordsHint);
        console.log(this.wordsAnswer);
        /* Then the order list is created and shuffled */
        this.order = this.shuffleDeck(this.wordCount);
        this.gameState = 1;
        return this.gameState;
    }

    getOrder(){
        return this.order;
    }

    getTestType(){
        switch(this.testType){
            case 0: return "Nouns";break;
            case 1: return "Verbs";break;
            case 2: return "Adjectives";break;
            case 3: return "Everything";break;
        }
    }

    setTestType(newType){
        if (isNaN(newType)){
            console.error("setTestType input malformed, use an int. Defaulting to zero.");
            this.testType = 0;
        }else{
            this.testType = newType;
        }
    }

    getAnswer(value){
        return this.wordsAnswer[value];
    }

    increaseScore(){
        this.correct++;
    }

    loseScore(){
        this.wrong++;
    }

    endGame(){
        this.gameState = 2;
        return this.gameState;
    }
}
