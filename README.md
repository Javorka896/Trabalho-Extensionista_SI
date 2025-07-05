# Center Ferramentas - Site de Vendas

## Descrição

Site de vendas completo para a **Center Ferramentas**, especializada em ferramentas, elétrica, hidráulica, parafusos, ferragens e utensílios domésticos. O projeto foi desenvolvido com tecnologias simples e puras, sem frameworks externos.

## Tecnologias Utilizadas

- **HTML5** - Estrutura do site
- **CSS3** - Estilização e design responsivo
- **JavaScript** - Funcionalidades interativas
- **Python** - Backend simulado para dados

## Estrutura do Projeto

```
center_ferramentas/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── main.js             # JavaScript funcional
├── app.py              # Backend Python
├── README.md           # Este arquivo
├── assets/             # Pasta para imagens
│   └── images/         # Imagens dos produtos
└── data/               # Dados simulados (criado automaticamente)
    ├── users.json      # Dados de usuários
    ├── products.json   # Catálogo de produtos
    ├── orders.json     # Pedidos realizados
    └── cart.json       # Carrinhos de compras
```

## Funcionalidades Implementadas

### 🎨 Design e Interface
- ✅ Paleta de cores personalizada (azul escuro, laranja vibrante, azul meia-noite)
- ✅ Tipografia moderna com fonte Poppins
- ✅ Design responsivo para desktop, tablet e mobile
- ✅ Animações e transições suaves
- ✅ Efeitos hover em botões e elementos interativos

### 🏠 Estrutura do Site
- ✅ Topo fixo com informações de contato
- ✅ Navegação principal sticky com logo, busca e ícones
- ✅ Carrossel de slides automático com navegação manual
- ✅ Seção de categorias com trapézios clicáveis
- ✅ Grid de produtos em destaque
- ✅ Rodapé completo com informações e redes sociais

### 🛒 Funcionalidades de E-commerce
- ✅ Catálogo de produtos com imagens, preços e avaliações
- ✅ Sistema de busca em tempo real
- ✅ Filtro por categorias
- ✅ Carrinho de compras lateral
- ✅ Adicionar/remover produtos do carrinho
- ✅ Alterar quantidades no carrinho
- ✅ Cálculo automático de totais
- ✅ Processo de checkout simulado

### 👤 Área do Cliente
- ✅ Modal de cadastro de usuário
- ✅ Formulário com validação
- ✅ Armazenamento local de dados
- ✅ Formatação automática de telefone e CEP

### 🔧 Backend Simulado
- ✅ Sistema de gerenciamento de produtos
- ✅ Controle de estoque
- ✅ Gerenciamento de usuários
- ✅ Sistema de carrinho persistente
- ✅ Criação e acompanhamento de pedidos
- ✅ Relatórios de vendas e estoque

## Como Usar

### 1. Executar o Site

Simplesmente abra o arquivo `index.html` em qualquer navegador moderno:

```bash
# Navegue até a pasta do projeto
cd center_ferramentas

# Abra o arquivo no navegador
# No Windows:
start index.html

# No macOS:
open index.html

# No Linux:
xdg-open index.html
```

### 2. Testar o Backend Python

```bash
# Execute o arquivo Python para testar funcionalidades
python3 app.py
```

### 3. Funcionalidades Disponíveis

#### Navegação
- **Busca**: Digite na barra de pesquisa para encontrar produtos
- **Categorias**: Clique nos trapézios para filtrar por categoria
- **Carrossel**: Navegação automática ou manual pelos slides

#### Carrinho de Compras
- **Adicionar**: Clique em "Adicionar ao Carrinho" nos produtos
- **Visualizar**: Clique no ícone do carrinho no topo
- **Gerenciar**: Altere quantidades ou remova itens
- **Finalizar**: Use o botão "Finalizar Compra"

#### Cadastro
- **Abrir**: Clique em "CADASTRE-SE AQUI" no topo
- **Preencher**: Complete todos os campos obrigatórios
- **Salvar**: Os dados são armazenados localmente

## Produtos Disponíveis

O site inclui 8 produtos de exemplo:

1. **Furadeira de Impacto 750W** - R$ 299,90
2. **Esmerilhadeira Angular 4.1/2"** - R$ 189,90
3. **Chave de Impacto Pneumática** - R$ 450,00
4. **Cone BT40 ER32** - R$ 125,50
5. **Paquímetro Digital 150mm** - R$ 89,90
6. **Micrômetro Externo 0-25mm** - R$ 156,00
7. **Parafusadeira Elétrica 12V** - R$ 199,90
8. **Relógio Comparador 0,01mm** - R$ 78,50

## Categorias

- **Ferramentas Rotativas**: Furadeiras, esmerilhadeiras, parafusadeiras
- **Cones BT**: Cones e acessórios para usinagem
- **Instrumentos de Precisão**: Paquímetros, micrômetros, relógios comparadores

## Responsividade

O site é totalmente responsivo e se adapta a:

- **Desktop**: Layout completo com todas as funcionalidades
- **Tablet**: Adaptação do grid e navegação
- **Mobile**: Interface otimizada para toque, menu adaptado

## Paleta de Cores

- **Fundo geral**: #343e8a (azul escuro suave)
- **Barra principal**: #fd6101 (laranja vibrante)
- **Carrossel**: #010c5e (azul meia-noite)
- **Textos**: #f1f1f1 (cinza muito claro)
- **Botões confirmar**: #27ae60 (verde)
- **Botões remover**: #e74c3c (vermelho)

## Contato da Empresa

- **Telefone**: (34) 99197-5188
- **Endereço**: Av. Juscelino Kubitschek, nº 596, Bairro Estudantil
- **E-mail**: centerferramentas01@gmail.com

## Redes Sociais

- Facebook
- Instagram  
- WhatsApp

## Observações Técnicas

### Armazenamento
- Os dados do carrinho são salvos no `localStorage` do navegador
- Os dados de cadastro são salvos localmente
- O backend Python simula um banco de dados com arquivos JSON

### Compatibilidade
- Funciona em todos os navegadores modernos
- Não requer servidor web (pode ser executado localmente)
- JavaScript puro sem dependências externas

### Imagens
- As imagens dos produtos usam placeholders SVG quando não encontradas
- Estrutura preparada para receber imagens reais na pasta `assets/images/`

## Melhorias Futuras

Para uma implementação em produção, considere:

1. **Backend real** com banco de dados
2. **Sistema de autenticação** completo
3. **Gateway de pagamento** real
4. **Sistema de envio** de e-mails
5. **Painel administrativo** web
6. **API REST** para integração
7. **Otimização de imagens** e performance
8. **SEO** e meta tags
9. **Analytics** e tracking
10. **Testes automatizados**

## Licença

Este projeto foi desenvolvido para a Center Ferramentas. Todos os direitos reservados.

---

**Desenvolvido com ❤️ usando tecnologias simples e eficientes**

