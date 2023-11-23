let prevScrollPos = window.pageYOffset;

        window.onscroll = function () {
            let currentScrollPos = window.pageYOffset;
            if (prevScrollPos > currentScrollPos) {
                document.getElementById("header").style.top = "0";
            } else {
                document.getElementById("header").style.top = "-50px";
            }
            prevScrollPos = currentScrollPos;
        }


        const btn = document.getElementById("calcular");
        const sobre = document.getElementById('sobre');

        btn.addEventListener("click", function(){
            
            const peso = parseFloat(document.getElementById("peso").value); 
            const altura = parseFloat(document.getElementById("altura").value);
            document.getElementById("saida").innerHTML = '';
            if(!peso || !altura){
                document.getElementById("saida").innerHTML = 'Insira algo nos campos'
            } else{
                sobre.style.display = "flex";

                const imc = peso/(altura*altura);
                document.getElementById("saida").innerHTML = `Seu IMC é de ${imc.toFixed(0)}`;
            }
            
            
        });

        const apiKey = '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'; // Substitua pelo seu próprio chave de API da OpenAI

        async function askQuestion() {
            const userQuestion = document.getElementById("user-input").value;
            appendMessage("Você:", userQuestion);

            const botResponse = await getBotResponse(userQuestion);
            appendMessage("Chat Bot:", botResponse);

            document.getElementById("user-input").value = '';
        }

        async function getBotResponse(userQuestion) {
            const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
            const prompt = `Pergunta: ${userQuestion}\nResposta:`;

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({
                        prompt: prompt,
                        max_tokens: 100,
                    }),
                });

                const data = await response.json();
                return data.choices[0].text.trim();
            } catch (error) {
                console.error('Erro ao obter resposta do bot:', error);
                return 'Desculpe, ocorreu um erro ao obter a resposta.';
            }
        }

        function appendMessage(sender, message) {    
            const chatDisplay = document.getElementById("chat-display");
            const messageElement = document.createElement("div");
            messageElement.innerHTML = `<strong>${sender}</strong>: ${message}`;
            chatDisplay.appendChild(messageElement);
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        }

        function toggleSidebar() {
            let sidebar = document.querySelector('.sidebar');
            sidebar.style.width = sidebar.style.width === '50%' ? '0' : '50%';
        }
        

        
