from xml.dom import minidom

doc = minidom.parse("c:/Users/20221181110003/Documents/tarefas/pos-2025-tarefas/parsers/cardapio.xml")

pratos = doc.getElementsByTagName("prato")

print("MENU - Selecione um ID para ver detalhes:\n")

for prato in pratos:
    id_ = prato.getAttribute("id")
    nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue
    print(f"{id_}: {nome}")

escolha = input("\nDigite o ID do prato: ")

for prato in pratos:
    if prato.getAttribute("id") == escolha:
        nome = prato.getElementsByTagName("nome")[0].firstChild.nodeValue
        descricao = prato.getElementsByTagName("descricao")[0].firstChild.nodeValue
        ingredientes = prato.getElementsByTagName("ingrediente")
        preco = prato.getElementsByTagName("preco")[0].firstChild.nodeValue
        calorias = prato.getElementsByTagName("calorias")[0].firstChild.nodeValue
        tempo = prato.getElementsByTagName("tempoPreparo")[0].firstChild.nodeValue

        print(f"\nNome: {nome}")
        print(f"Descrição: {descricao}")
        print("Ingredientes:")
        for ing in ingredientes:
            print(f" - {ing.firstChild.nodeValue}")
        print(f"Preço: R$ {preco}")
        print(f"Calorias: {calorias}")
        print(f"Tempo de Preparo: {tempo} minutos")
        break
else:
    print("ID não encontrado.")
