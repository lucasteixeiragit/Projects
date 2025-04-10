import yt_dlp
import glob
import datetime
import os
import time

from tkinter import Tk, Label, Entry, Button, StringVar, filedialog, messagebox, OptionMenu  # Biblioteca para interface gráfica



janela = Tk() # cria a janela
janela.title("Playlist Downloader") # Titutlo da janela
janela.geometry("400x300")

# Caminho

def selecionar_pasta():
    # caminho.set(filedialog.askdirectory())
    
    pasta = filedialog.askdirectory()
    caminho_temp.set(pasta + "/")
    
caminho_temp = StringVar()
Label(janela, text="Caminho de download: ").pack()
Entry(janela, textvariable=caminho_temp, width=40).pack()
Button(janela, text="Selecionar Pasta", command=selecionar_pasta).pack()


# Selecionar formato
formato = StringVar()
Label(janela, text = "Formato do arquivo: ").pack()
formato.set("MP4")
OptionMenu(janela, formato, "MP4", "M4A").pack()

#formato para glob.glob
if formato == "MP4":
    formato = 'mp4/bestvideo/best'
elif formato =="M4A":
    formato = 'm4a/bestaudio/best'

#formatos para yt_dlp
formatos = {
    "MP4": "bestvideo+bestaudio/best",
    "M4A": "m4a/bestaudio/best"
    
    }



# Opcao para baixar playlist completa
playlist = StringVar()
Label(janela, text= "Baixar playlist completa ou video unico? ").pack()
OptionMenu(janela, playlist, "Playlist", "Vídeo Unico").pack()



# Inserir URL
url = StringVar()
Label(janela, text = "Cole o URL:").pack()
Entry(janela, textvariable=url, width=40).pack()



# Função para fazer o download do vídeo em MP4
def download_playlist(url):
    
    caminho = caminho_temp.get()
    selected_format = formatos.get(formato.get(), "bestvideo+bestaudio/best")
    
    if not caminho or not url or not playlist:
        messagebox.showerror("Erro", "Preencha todos os campos.")
        return
    
    
    # Se baixar video unico, nao inserir index
    playlist_index = StringVar()
    if playlist.get() == "Playlist":
        playlist_index = ("%(playlist_index)s. %(title)s.%(ext)s") 
    else:
        playlist_index = ("%(title)s.%(ext)s")
    
    print("===========")
    print(caminho + "." + formato.get())
    print(playlist_index)
    print("===========")
    
    ydl_opts = {
        'format': selected_format,  # Baixar o melhor formato disponível
        'outtmpl':caminho + playlist_index,  # Salvar com o nome do vídeo como título
        'touch_date': True, # Atualiza a data de modificacao para a data do download
        'noplaylist': False if playlist.get() == "Playlist" else True,  # Não baixar playlists, apenas o link
        'quiet': False,  # Exibir detalhes durante o download
    }
    
    download_time = time.time()
    download_time2 = datetime.datetime.now()
    
        
    # Usar o yt-dlp com as opções definidas
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        

    downloaded_files = glob.glob(caminho + "*." + formato.get())
    
    for file in downloaded_files:
            # Atualiza a data de modificação e acesso do arquivo
            os.utime(file, (download_time, download_time))
            

            

     
    print(download_time)      
    print(download_time2)
    
    
    messagebox.showinfo("Sucesso", "Download concluido!")
    
    # Botao para iniciar download
#Button(janela, text = "Iniciar Download", command=download_playlist(url.get())).pack()
Button(janela, text="Iniciar Download", command=lambda: download_playlist(url.get())).pack()




janela.mainloop() # Mantem a janela aberta





"""
formato = input("Formado do arquivon(MP4, M4A): ")
if formato == "MP4":
    formato = "mp4/bestvideo/best"
elif formato == "M4A":
    formato = "m4a/bestaudio/best"
else:
    print("Formado não disponivel no momento!")
    
    """

"""
playlist = input("Baixar playlist completa? (S/N): ")
if playlist.upper() == "S":
        playlist = False
else:
        playlist = True
"""

"""
# Função para fazer o download do vídeo em MP4
def download_playlist(url):
    
    
    ydl_opts = {
        'format': formato,  # Baixar o melhor formato disponível
        'outtmpl':caminho.get() + '%(playlist_index)s. %(title)s.%(ext)s',  # Salvar com o nome do vídeo como título
        'touch_date': True, # Atualiza a data de modificacao para a data do download
        'noplaylist': playlist,  # Não baixar playlists, apenas o link
        'quiet': False,  # Exibir detalhes durante o download
    }
    
    download_time = time.time()
    download_time2 = datetime.datetime.now()
    
        
    # Usar o yt-dlp com as opções definidas
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        
    downloaded_files = glob.glob(caminho + "*." + formato)
    
    for file in downloaded_files:
            # Atualiza a data de modificação e acesso do arquivo
            os.utime(file, (download_time, download_time))
        
     
    print(download_time)      
    print(download_time2)
    
    
  
# Exemplo de uso: URL do vídeo do YouTube que você quer baixar
video_url = url  # Substitua pelo link do vídeo desejado
download_playlist(video_url)


"""
















