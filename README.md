# Para inicializar API verifique o comando de inicialização no "packahe.json"
# Veja as Variáveis de ambiente necessárias para o projeto rodar em ".env.exemplo"

#COMO COMPILAR A API.
# Os arquivos serão compilados pedo "tsc", pra isso
# o "tscconfig.json" transpila o código typescript em JavaScript
# Remova o comentário da opcção {outDir} no ts.config e configure a pasta que sera gerado o código JavaScript


#PASSO A PASSO DA API
#ADD YUP

# O yup serve para diminuir e facilitar o desenvolvimento do tratamento de dados
# em controllers deve ser criado uma pasta pra cada controle específico emxemplo "cidade"/ "usário"
# cada cada objeto, com seu comtrole de criação cada um com seu propio index 
# No index importamos todos os documentos e criamos uma contante Controller{Object} essa contante contem todos os controles 
# e funções CRUD do Object, que é chamado nas routes

#TRADUÇÂO DO YUP

# A tradução do yup deve ser feita na pasta shared/services em um arquivo TranslationYup.ts
# Nesse aquirvo deve se importar o setLocate do Yup e redefinilo como no arquivo equivalente desse repositório


#MIDDLEWARE

# os midleweres são funções que fazem o tratamento de dados, ou seja fazem a integração do front end / banco de dados
# Eles verificam oq é útil e oq não é para o sistema e retornam mensagem para o lado client

#UPANDODO MIDDLEWARE

# Para um código mais limpo e de mais facil manutenção, vamos criar uma função que valida