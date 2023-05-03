# Para inicializar API verifique o comando de inicialização no "packahe.json"
# Veja as Variáveis de ambiente necessárias para o projeto rodar em ".env.exemplo"

#COMO COMPILAR A API.
#Os arquivos serão compilados pedo "tsc", pra isso
#o "tscconfig.json" transpila o código typescript em JavaScript
#Remova o comentário da opcção {outDir} no ts.config e configure a pasta que sera gerado o código JavaScript


# PASSO A PASSO DA API
# ADD YUP

#O yup serve para diminuir e facilitar o desenvolvimento do tratamento de dados
#em controllers deve ser criado uma pasta pra cada controle específico emxemplo "cidade"/ "usário"
#cada cada objeto, com seu comtrole de criação cada um com seu propio index 
#No index importamos todos os documentos e criamos uma contante Controller{Object} essa contante contem todos os controles 
#e funções CRUD do Object, que é chamado nas routes

# TRADUÇÂO DO YUP

#A tradução do yup deve ser feita na pasta shared/services em um arquivo TranslationYup.ts
#Nesse aquirvo deve se importar o setLocate do Yup e redefinilo como no arquivo equivalente desse repositório


# MIDDLEWARE

#os midleweres são funções que fazem o tratamento de dados, ou seja fazem a integração do front end / banco de dados
# Eles verificam oq é útil e oq não é para o sistema e retornam mensagem para o lado client

# UPANDODO MIDDLEWARE

#Para um código mais limpo e de mais facil manutenção, vamos criar uma função que faz o papel de middleware, na pasta shared/middleware vamos ter o arquivo Validation, ele tera uma função genérica para parametrizar o código.

# Test
é uma pasta destina a usar um framework de test para isso, deve ... 


# ORM
#ORMs é um manipulador de banco de dados por convenção deve ser configurado da pasta dabatabese do projeto. criasse uma pasta com o nome da orm desejada configusse o index exportando tudo da pasta com "export {};" detro desta pasta criasse outra pasta @types. Essa pasta é ultilizada para fazer a configuração dos ambientes(Envoriments) sendo eles 

# migrations
Arquivos gerados pela ORM que Manipula as tabelas no banco de dados, a ORM gera um arquivo e esse arquivo que realmente se comunica e troca informação com o banco de dados
