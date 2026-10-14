# Catálogo De Minas — pedido pelo WhatsApp

Página única (sem servidor) para o QR Code do panfleto. O cliente escolhe os produtos por categoria e o pedido sai montado no WhatsApp **(11) 98697-5803**.

## Duas páginas, um só cadastro de produtos
- `index.html` — **catálogo completo** (todas as categorias) → use nas redes sociais.
  Endereço: `https://SEU-USUARIO.github.io/catalogo-deminas/`
- `congelados.html` — **só os congelados**, com atalhos por fornecedor → use no QR Code do panfleto dos congelados.
  Endereço: `https://SEU-USUARIO.github.io/catalogo-deminas/congelados.html`

As duas leem o mesmo `produtos.json`: mudou um preço ou uma foto, vale para as duas.

## Queijos cobrados por quilo
Os queijos por kg mostram o aviso “valor final após a pesagem”: no topo da categoria, em cada produto, no carrinho (“Total estimado”) e na mensagem do WhatsApp (“~1,5 kg … ≈ R$ …”).

## Arquivos
- `index.html` e `congelados.html` — o catálogo e o painel de administração
- `produtos.json` — todos os produtos, preços e categorias (é isto que o painel atualiza)
- `img/` — fotos dos produtos e logo
- `lib/qrcode.js` — gerador de QR Code (usado no painel)
- `.nojekyll` — necessário para o GitHub Pages servir tudo normalmente

## 1. Colocar no GitHub
1. Em github.com, **New repository** (ex.: `catalogo-deminas`), marque **Public**.
2. **Add file → Upload files** e arraste **todo o conteúdo** desta pasta (inclusive as pastas `img` e `lib` e o arquivo `.nojekyll`). **Commit changes**.
3. **Settings → Pages → Build and deployment**: Source = *Deploy from a branch*, Branch = `main` / `(root)` → **Save**.
4. Em 1–2 minutos o site abre em `https://SEU-USUARIO.github.io/catalogo-deminas/`.

## 2. QR Code
Abra a página desejada com `#admin` no final (ex.: `.../congelados.html#admin` para o panfleto de congelados) → botão **QR Code**. Cada página gera o QR do próprio endereço; a arte do panfleto de congelados sai com “Escaneie e peça seus congelados”. Baixe o PNG simples ou a **arte De Minas** (logo + QR). Teste com a câmera do celular antes de imprimir.

## 3. Editar produtos (modo administrador)
Abra o endereço do site com `#admin` no final.
- **Preço**: digite direto no campo de cada embalagem.
- **Editar**: nome, categoria, subgrupo/fornecedor, **foto** (escolher da galeria ou tirar na hora), embalagens e preços, “por kg”, “Consultar estoque”, ordem e excluir.
- **Disponível**: desmarque para mostrar “Indisponível” sem apagar o produto.
- **+ Novo produto** em cada categoria; **Categorias** para criar, renomear, reordenar; **Loja** para trocar o WhatsApp e os avisos do rodapé.
- As alterações ficam como **rascunho neste aparelho** até você tocar em **Publicar**.

### Publicar direto do painel (uma vez só: criar o token)
1. GitHub → **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. *Repository access*: **Only select repositories** → escolha o repositório do catálogo.
3. *Permissions → Repository permissions → Contents*: **Read and write**.
4. Copie o token. No painel: **GitHub** → preencha usuário, repositório, branch (`main`) e cole o token → **Testar** → **Salvar**.
5. Toque em **Publicar**. Em 1–2 minutos os clientes veem as mudanças.

O token fica só no navegador do aparelho que você usou; quem abrir `#admin` sem o token consegue mexer apenas no próprio rascunho, nunca no site publicado.

### Alternativa sem token
**Exportar** baixa o `produtos.json`; no GitHub, abra o arquivo → lápis → substitua o conteúdo (ou **Add file → Upload files** para trocar o arquivo). Fotos novas precisam ser enviadas para a pasta `img/` e o caminho informado no JSON — por isso o **Publicar** é bem mais prático.
