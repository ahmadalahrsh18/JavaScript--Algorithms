// Sorted Characters Frequencies – Algorithm

class CharFreq {
    ASCIIMethod(message) {
        console.log("ASCIIMethod");

        const freq = new Array(127).fill(0);

        for (let i = 0; i < message.length; i++) {
            const current_code = message.charCodeAt(i);
            freq[current_code]++;
        }

        for (let i = 0; i < freq.length; i++) {
            if (freq[i] > 0) {
                const c = String.fromCharCode(i);
                console.log(c + " " + freq[i]);
            }
        }
    }

    AnyCodeMethod(message) {
        console.log("AnyCodeMethod");

        const freq = new Map();

        for (let i = 0; i < message.length; i++) {
            const char = message[i];

            if (!freq.has(char)) {
                freq.set(char, 1);
            } else {
                freq.set(char, freq.get(char) + 1);
            }
        }

        for (const [k, v] of freq) {
            console.log(k + " " + v);
        }

        this.SortMap(freq);
    }

    SortMap(freq) {
        const freqArray = Array.from(freq);

        freqArray.sort((a, b) => a[0].localeCompare(b[0]));

        console.log("Print Sorted data ...");
        for (const [char, count] of freqArray) {
            console.log(char + " " + count);
        }
    }
}

const charFreq = new CharFreq();

const message = "this is a sample message";
charFreq.ASCIIMethod(message);
charFreq.AnyCodeMethod(message);
