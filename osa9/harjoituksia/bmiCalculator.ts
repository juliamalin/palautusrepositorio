interface Properties {
    height: number,
    weight: number
}

const parseArgument = (args: string[]): Properties => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    } else {
        throw new Error('Provided were not numbers!');
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight/((height/100)**2);
    if (bmi < 18.5){
        return 'Unhealthy (Underweight)';
    } else if (bmi >= 18.5 && bmi <=22.9){
        return 'Healthy (Normal weight)';
    } else if (bmi >= 23.0 && bmi <=24.9){
        return 'At risk (Overweight I)';
    } else if (bmi >= 25.0 && bmi <=29.9){
        return 'Moderately obese (Overweight II)';
    } else if (bmi >= 30.0){
        return 'Severely obese (Overweight III)';
    }
    return 'undefined';
};

try {
    const {height, weight} = parseArgument(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'something bad happened';
    if (error instanceof Error){
        errorMessage += 'Error: '+ error.message;
    }
    console.log(errorMessage);
}