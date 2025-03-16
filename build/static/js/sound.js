class GameSound {
    constructor() {
        this.synth = new Tone.Synth().toDestination();
        this.successSound = new Tone.Synth({
            oscillator: { type: 'sine' },
            envelope: {
                attack: 0.01,
                decay: 0.1,
                sustain: 0,
                release: 0.1
            }
        }).toDestination();
        
        this.missSound = new Tone.NoiseSynth({
            noise: { type: 'white' },
            envelope: {
                attack: 0.01,
                decay: 0.1,
                sustain: 0,
                release: 0.1
            }
        }).toDestination();
    }

    playSuccess() {
        this.successSound.triggerAttackRelease('C6', '0.1');
        setTimeout(() => {
            this.successSound.triggerAttackRelease('E6', '0.1');
        }, 50);
    }

    playMiss() {
        this.missSound.triggerAttackRelease('8n');
    }

    playGameStart() {
        const now = Tone.now();
        this.synth.triggerAttackRelease('C4', '8n', now);
        this.synth.triggerAttackRelease('E4', '8n', now + 0.1);
        this.synth.triggerAttackRelease('G4', '8n', now + 0.2);
    }

    playGameOver() {
        const now = Tone.now();
        this.synth.triggerAttackRelease('G4', '8n', now);
        this.synth.triggerAttackRelease('E4', '8n', now + 0.1);
        this.synth.triggerAttackRelease('C4', '8n', now + 0.2);
    }
}
