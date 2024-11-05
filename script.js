class Champion {
    constructor(name, life, attack, armor) {
        this.name = name;
        this.life = life;
        this.attack = attack;
        this.armor = armor;
        this.initialLife = life; // Guarda o HP inicial para verificar as condições de dano
    }

    // Gera o dano aleatório com base no HP inicial do campeão
    calculateRandomDamage() {
        if (this.initialLife > 100) {
            return Math.floor(Math.random() * 50) + 1; // Dano entre 1 e 50
        } else {
            return Math.floor(Math.random() * 12) + 1; // Dano entre 1 e 12
        }
    }

    takeDamage() {
        const damage = this.calculateRandomDamage();
        this.life = Math.max(0, this.life - damage); // a vida não pode ser negativa
        return damage; // Retorna o dano causado
    }

    status() {
        return `${this.name}: ${this.life > 0 ? this.life + " de vida" : "morreu"}`;
    }

    isAlive() {
        return this.life > 0;
    }
}

function startCombat() {
    const name1 = document.getElementById("name1").value;
    const life1 = parseInt(document.getElementById("life1").value);
    const attack1 = parseInt(document.getElementById("attack1").value);
    const armor1 = parseInt(document.getElementById("armor1").value);

    const name2 = document.getElementById("name2").value;
    const life2 = parseInt(document.getElementById("life2").value);
    const attack2 = parseInt(document.getElementById("attack2").value);
    const armor2 = parseInt(document.getElementById("armor2").value);

    const turns = parseInt(document.getElementById("turns").value);

    const champion1 = new Champion(name1, life1, attack1, armor1);
    const champion2 = new Champion(name2, life2, attack2, armor2);

    let result = "";

    for (let i = 1; i <= turns; i++) {
        if (!champion1.isAlive() || !champion2.isAlive()) {
            break;
        }

        // Aplica dano aleatório a cada campeão
        const damageToChamp1 = champion1.takeDamage();
        const damageToChamp2 = champion2.takeDamage();

        // Exibe o resultado do turno com a quantidade de dano em vermelho na tela
        result += `<p>Resultado do turno ${i}:</p>`;
        result += `<p>${champion1.status()} <span class="damage">(${champion1.name} recebeu ${damageToChamp1} de dano!)</span></p>`;
        result += `<p>${champion2.status()} <span class="damage">(${champion2.name} recebeu ${damageToChamp2} de dano!)</span></p>`;
        result += `<hr>`;
    }

    // Determina o vencedor
    if (!champion1.isAlive() && !champion2.isAlive()) {
        result += "<p>Ambos os campeões morreram. É um empate!</p>";
    } else if (champion1.isAlive() && !champion2.isAlive()) {
        result += `<p>${champion2.name} terminou com 0 HP. ${champion1.name} é o vencedor!</p>`;
    } else if (!champion1.isAlive() && champion2.isAlive()) {
        result += `<p>${champion1.name} terminou com 0 HP. ${champion2.name} é o vencedor!</p>`;
    } else {
        // Se ambos ainda estão vivos, vence o que tiver mais HP
        if (champion1.life > champion2.life) {
            result += `<p>O combate terminou. ${champion1.name} terminou com mais HP (${champion1.life} de vida) e é o vencedor!</p>`;
        } else if (champion2.life > champion1.life) {
            result += `<p>O combate terminou. ${champion2.name} terminou com mais HP (${champion2.life} de vida) e é o vencedor!</p>`;
        } else {
            result += "<p>O combate terminou em empate, ambos os campeões têm a mesma quantidade de HP!</p>";
        }
    }

    result += "<p>### FIM DO COMBATE ###</p>";
    document.getElementById("combat-result").innerHTML = result;
}
