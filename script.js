class Champion {
    constructor(name, life, attack, armor) {
        this.name = name;
        this.life = life;
        this.attack = attack;
        this.armor = armor;
        this.initialLife = life; // Guarda o HP inicial para decidir o intervalo de dano
    }

    // Calcula um dano aleatório baseado no HP inicial do campeão
    calculateRandomDamage() {
        if (this.initialLife > 100) {
            // Se o HP inicial for maior que 100, dano vai de 1 a 50
            return Math.floor(Math.random() * 50) + 1;
        } else {
            // Se não, dano vai de 1 a 12
            return Math.floor(Math.random() * 12) + 1;
        }
    }

    // Aplica o dano e garante que a vida não fique negativa
    takeDamage() {
        const damage = this.calculateRandomDamage();
        this.life = Math.max(0, this.life - damage);
        return damage; // Retorna quanto de dano foi causado pra gente mostrar
    }

    // Mostra o status do campeão (se ainda está vivo ou já foi derrotado)
    status() {
        return `${this.name}: ${this.life > 0 ? this.life + " de vida" : "morreu"}`;
    }

    // Verifica se o campeão ainda está vivo
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
    let currentTurn = 1;

    // Configura o controle de volume
    document.getElementById("volume-range").addEventListener("input", function(event) {
        const volume = event.target.value;
        const victorySound = document.getElementById("victory-sound");
        victorySound.volume = volume; // Define o volume do áudio
    });

    // Função que vai executar cada turno com um intervalo de 1 segundo entre eles pra deixar mais dinâmico 
    function executeTurn() {
        // Checa se o combate deve acabar (fim dos turnos ou um dos campeões derrotado)
        if (currentTurn > turns || !champion1.isAlive() || !champion2.isAlive()) {
            let winnerText = ""; // Texto para o nome do vencedor
    
            // Determina o vencedor e exibe a mensagem de fim do combate
            if (!champion1.isAlive() && !champion2.isAlive()) {
                result += "<p>Ambos os campeões morreram. É um empate!</p>";
                winnerText = "Empate!";
            } else if (champion1.isAlive() && !champion2.isAlive()) {
                result += `<p>${champion2.name} terminou com 0 HP. ${champion1.name} é o vencedor!</p>`;
                winnerText = `${champion1.name} Venceu!`;
            } else if (!champion1.isAlive() && champion2.isAlive()) {
                result += `<p>${champion1.name} terminou com 0 HP. ${champion2.name} é o vencedor!</p>`;
                winnerText = `${champion2.name} Venceu!`;
            } else {
                if (champion1.life > champion2.life) {
                    result += `<p>O combate terminou. ${champion1.name} tem mais HP (${champion1.life} de vida) e é o vencedor!</p>`;
                    winnerText = `${champion1.name} Venceu!`;
                } else if (champion2.life > champion1.life) {
                    result += `<p>O combate terminou. ${champion2.name} tem mais HP (${champion2.life} de vida) e é o vencedor!</p>`;
                    winnerText = `${champion2.name} Venceu!`;
                } else {
                    result += "<p>O combate terminou em empate, ambos os campeões têm a mesma quantidade de HP!</p>";
                    winnerText = "Empate!";
                }
            }
    
            // Exibe o nome do vencedor e o gif
            document.getElementById("combat-result").innerHTML = result;
            document.getElementById("winner-name").innerHTML = winnerText;
            document.getElementById("winner-name").style.display = "block";
            document.getElementById("end-gif").style.display = "block";
            
            // Toca o áudio da vitória
            const victorySound = document.getElementById("victory-sound");
            victorySound.play().catch(error => {
                console.log("O autoplay do áudio foi bloqueado pelo navegador.", error);
            });

            // Rolagem automática para o final da div
            document.getElementById("combat-result").scrollTop = document.getElementById("combat-result").scrollHeight;
    
            return;
        }

        // Executa o turno atual e calcula o dano para cada campeão
        const damageToChamp1 = champion1.takeDamage();
        const damageToChamp2 = champion2.takeDamage();

        // Mostra o que aconteceu nesse turno
        result += `<p>Resultado do turno ${currentTurn}:</p>`;
        result += `<p>${champion1.status()} <span class="damage">(${champion1.name} recebeu ${damageToChamp1} de dano!)</span></p>`;
        result += `<p>${champion2.status()} <span class="damage">(${champion2.name} recebeu ${damageToChamp2} de dano!)</span></p>`;
        result += `<hr>`;
        
        // Atualiza o conteúdo da tela
        document.getElementById("combat-result").innerHTML = result;

        // Rolagem automática para o final da div a cada turno
        document.getElementById("combat-result").scrollTop = document.getElementById("combat-result").scrollHeight;

        currentTurn++;
        // Espera 1 segundo antes de rodar o próximo turno
        setTimeout(executeTurn, 1000);
    }

    // Começa o primeiro turno
    executeTurn();
}
