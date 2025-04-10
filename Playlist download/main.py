from tkinter import *

janela = Tk() # cria a janela
janela.title("Playlist Downloader") # Titutlo da janela


# Formato do arquivo

formato_select = StringVar(value="mp4")

label = Label(janela, text="Formato do arquivo: ")
label.pack()


formatoopcao1 = Radiobutton(janela, text="MP4 (Vívdeo)", variable=formato_select, value="mp4")
formatoopcao1.pack()

formatoopcao2 = Radiobutton(janela, text="M4A (Audio)", variable=formato_select, value="m4a")
formatoopcao2.pack()

# Caminho para download

# caminho_select = StringVar(value="C:\Temp\%(playlist_index)s. %(title)s.%(ext)s")






janela.mainloop() # Mantem a janela aberta