import yt_dlp
import glob
import datetime
import os
import time


caminho = str(input("Caminho do download: "))

# Função para fazer o download em M4A 
def download_playlist(url):
    ydl_opts = {
        'format': 'm4a/bestaudio/best',  # Baixar o melhor formato disponível
        'extractaudio': True, # extrair apenas o audio
        'audioquality': 0, # qualidade 0 é a melhor qualidade
        'outtmpl':caminho + '%(playlist_index)s. %(title)s.%(ext)s',  # Salvar com o nome do vídeo como título
        'touch_date': True, # Atualiza a data de modificacao para a data do download
        'noplaylist': False,  # Não baixar playlists, apenas o link
        'quiet': False,  # Exibir detalhes durante o download
    }
    
    download_time = time.time()
    download_time2 = datetime.datetime.now()
    
        
    # Usar o yt-dlp com as opções definidas
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])
        
    downloaded_files = glob.glob("C:/Users/0312958/Downloads/musicas/*.m4a")
    
    for file in downloaded_files:
            # Atualiza a data de modificação e acesso do arquivo
            os.utime(file, (download_time, download_time))
        
     
    print(download_time)      
    print(download_time2)
    
    
        
# Exemplo de uso: URL do vídeo do YouTube que você quer baixar
video_url = "https://www.youtube.com/watch?v=NdrBsVaZ0KA&list=PLNokR5tchdi3kFuv46h-NwKSn3nYY3rrP"  # Substitua pelo link do vídeo desejado
download_playlist(video_url)


