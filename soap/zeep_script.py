import zeep as zeep_lib

wsdl_url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL"
client = zeep_lib.Client(wsdl=wsdl_url)

def main():
    try:
        numero = int(input("Digite um número inteiro: "))
        resultado = client.service.NumberToWords(ubiNum=numero)
        print(f"{numero} por extenso em inglês: {resultado}")
    except ValueError:
        print("Por favor, digite um número inteiro válido.")
    except Exception as e:
        print("Erro ao se conectar com o serviço:", e)

if __name__ == "__main__":
    main()
