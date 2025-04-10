import yt_dlp  # Biblioteca para baixar vídeos do YouTube
import glob  # Para buscar arquivos no diretório
import datetime  # Para manipular datas
import os  # Para operações do sistema operacional
import time  # Para medir tempo
from tkinter import Tk, Label, Entry, Button, StringVar, filedialog, messagebox, OptionMenu  # Biblioteca para interface gráfica

# Função para selecionar o diretório de download
def selecionar_pasta():
    pasta = filedialog.askdirectory()  # Abre um seletor de pasta
    caminho_var.set(pasta + "/")  # Define o caminho escolhido na variável

# Função para baixar um vídeo ou playlist
def download_playlist():
    caminho = caminho_var.get()  # Obtém o caminho selecionado pelo usuário
    formato = formato_var.get()  # Obtém o formato escolhido (MP4 ou M4A)
    playlist = playlist_var.get()  # Obtém a opção de download (Playlist ou Vídeo Único)
    url = url_var.get()  # Obtém a URL inserida
    
    # Verifica se todos os campos foram preenchidos
    if not caminho or not url:
        messagebox.showerror("Erro", "Por favor, preencha todos os campos.")
        return
    
    # Define o formato de download com base na escolha do usuário
    if formato == "MP4":
        formato_download = "mp4/bestvideo/best"
    elif formato == "M4A":
        formato_download = "m4a/bestaudio/best"
    else:
        messagebox.showerror("Erro", "Formato não disponível.")
        return
    
    # Configura a opção de playlist
    playlist_option = False if playlist == "Playlist" else True
    
    # Define as opções para o yt-dlp
    ydl_opts = {
        'format': formato_download,  # Formato de saída
        'outtmpl': caminho + '%(playlist_index)s. %(title)s.%(ext)s',  # Nome do arquivo
        'touch_date': True,  # Mantém a data original do arquivo
        'noplaylist': playlist_option,  # Determina se é uma playlist ou um único vídeo
        'quiet': False,  # Exibe detalhes do download
    }
    
    download_time = time.time()  # Registra o tempo atual para atualização do arquivo
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])  # Realiza o download
        
        downloaded_files = glob.glob(caminho + "/*.MP4")  # Lista os arquivos baixados
        for file in downloaded_files:
            os.utime(file, (download_time, download_time))  # Atualiza a data de modificação dos arquivos
        
        messagebox.showinfo("Sucesso", "Download concluído com sucesso!")
    except Exception as e:
        messagebox.showerror("Erro", f"Ocorreu um erro: {e}")  # Exibe mensagem de erro caso ocorra alguma falha

# Criando a interface gráfica
janela = Tk()  # Inicializa a janela principal
janela.title("Playlist Downloader")  # Define o título da janela
janela.geometry("400x300")  # Define o tamanho da janela

# Campo para selecionar o caminho do download
Label(janela, text="Caminho do download:").pack()
caminho_var = StringVar()
Entry(janela, textvariable=caminho_var, width=40).pack()
Button(janela, text="Selecionar Pasta", command=selecionar_pasta).pack()

# Menu para escolher o formato do arquivo
Label(janela, text="Formato do arquivo:").pack()
formato_var = StringVar(janela)
formato_var.set("MP4")
OptionMenu(janela, formato_var, "MP4", "M4A").pack()

# Menu para escolher entre baixar uma playlist ou um vídeo único
Label(janela, text="Playlist ou Vídeo Único:").pack()
playlist_var = StringVar(janela)
playlist_var.set("Playlist")
OptionMenu(janela, playlist_var, "Playlist", "Vídeo Único").pack()

# Campo para inserir a URL do vídeo ou da playlist
Label(janela, text="URL da playlist/vídeo:").pack()
url_var = StringVar()
Entry(janela, textvariable=url_var, width=40).pack()

# Botão para iniciar o download
Button(janela, text="Baixar", command=download_playlist).pack()

janela.mainloop()  # Mantém a janela aberta
