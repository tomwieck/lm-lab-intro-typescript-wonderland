import { endAdventure } from '..';
import { wakeUp } from './6_wake_up';
import { askQuestion, clear, print } from '../console';

const verdicts = ['Guilty', 'Not Guilty'] as const;
type Verdict = typeof verdicts[number];

interface Witness {
	name: string;
	giveEvidence: () => Verdict;
}

export function meetTheQueen(): void {
	clear(true);
	print('The Queen has put you on trial for stealing tarts.');

	let guilty: boolean = false;

	const witnessNames: string[] = [
		'The Mad Hatter',
		'The March Hare',
		'The Cheshire Cat',
		'The White Rabbit',
	];

	let witnesses: Witness[] = getWitnesses(witnessNames);

	if (!witnesses || witnesses.length === 0) {
		print(`No witnesses have come forward to defend you.`);
		guilty = true;
	}

	let witnessCount = 0;

	witnesses.forEach((witness) => {
		witnessCount++;
		print(
			`${witness.name} gives their evidence: ${witness.giveEvidence()}`
		);
		if (witness.giveEvidence() === 'Guilty') {
			guilty = true;
		}
	});

	if (witnessCount < 4 || guilty) {
		print(`You have been found guilty! "Off with her head!" 😱`);
		return endAdventure();
	} else {
		print(`You have been found NOT GUILTY! Thank goodness. 🥳`);
		print('Time to wake up...');
		return askQuestion('Press ENTER to continue! ', wakeUp);
	}
}

function getWitnesses(witnessNames: string[]): Array<Witness> {
	return witnessNames.map(n => { return { name: n, giveEvidence: () => 'Not Guilty',}});
}
