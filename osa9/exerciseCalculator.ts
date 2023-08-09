
interface ExerciseResult {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}

interface MultiplyValues {
    dailyHours: number[],
    target: number
}

const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 7) throw new Error('Not enough arguments');
    if (args.length > 11) throw new Error('Too many arguments');
    
    const target = Number(args[2]);
    const dailyHours: number[]=args.slice(3).map(arg => parseFloat(arg));

    if(!isNaN(Number(target)) && dailyHours.every(hour => !isNaN(hour))){
        return {
            target,
            dailyHours
        };
    } else {
        throw new Error('Provided were not numbers!');
    }
};

export const exerciseCalculator = (dailyHours: number[], target: number): ExerciseResult => {
    const result = dailyHours.reduce(function(a, b) {
        return a+b;
    });
    const trainingDays=dailyHours.filter((d) => d > 0);

    const average = result/(dailyHours.length);
    const is_reached = average >= target;

    let rating: 1 | 2 | 3;
    let ratingDescription: "needs improvement" |"good"|"excellent";
    if (average >= target* 1.2){
        rating = 3;
        ratingDescription = "excellent";
    } else if (average >= target * 0.8){
        rating = 2;
        ratingDescription="good";
    } else {
        rating = 1;
        ratingDescription="needs improvement";
    }

    return {
        periodLength: dailyHours.length,
        trainingDays: trainingDays.length,
        success: is_reached,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};
try {
    const {target, dailyHours} = parseArguments(process.argv);
    console.log(exerciseCalculator(dailyHours, target));
} catch (error: unknown) {
    let errorMessage = 'something bad happened';
    if (error instanceof Error){
        errorMessage += 'Error: '+ error.message;
    }
    console.log(errorMessage);
}