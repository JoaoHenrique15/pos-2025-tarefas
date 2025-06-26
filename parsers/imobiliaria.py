from xml.dom.minidom import parse
import json

dom = parse("C:/Users/20221181110003/Documents/tarefas/pos-2025-tarefas/parsers/imobiliaria.xml")
raiz = dom.documentElement
imoveis = raiz.getElementsByTagName("imovel")

lista_imoveis = []

for imovel in imoveis:
    descricao = imovel.getElementsByTagName("descricao")[0].firstChild.nodeValue
    endereco = imovel.getElementsByTagName("endereco")[0].firstChild.nodeValue
    caracteristicas = imovel.getElementsByTagName("caracteristicas")[0].firstChild.nodeValue
    valor = imovel.getElementsByTagName("valor")[0].firstChild.nodeValue

    proprietario = imovel.getElementsByTagName("proprietario")[0]
    nome = proprietario.getElementsByTagName("nome")[0].firstChild.nodeValue

    emails = [e.firstChild.nodeValue for e in proprietario.getElementsByTagName("email")]
    telefones = [t.firstChild.nodeValue for t in proprietario.getElementsByTagName("telefone")]

    imovel_json = {
        "descricao": descricao,
        "endereco": endereco,
        "caracteristicas": caracteristicas,
        "valor": valor,
        "proprietario": {
            "nome": nome,
            "emails": emails,
            "telefones": telefones
        }
    }

    lista_imoveis.append(imovel_json)

with open("C:/Users/20221181110003/Documents/tarefas/pos-2025-tarefas/parsers/imobiliaria.json", "w", encoding="utf-8") as f:
    json.dump({"imoveis": lista_imoveis}, f, indent=4, ensure_ascii=False)

print("Arquivo imobiliaria.json gerado com sucesso!")
