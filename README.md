# Gulp.js - optymalizacja PS

Skrypt umożliwiający automatyzacje zadań związanych z optymalizacją szybkości działania stron internetowych (kompresja grafik, konwersja do WebP, minifikacja i łączenie plików CSS i JS)

## Instalacja z terminala WSL

1. Zainstaluj Node Version Manager poleceniem: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`.
2. Zrestartuj terminal WSL, następnie sprawdź, czy NVM zainstalował się poprawnie poleceniem `nvm -v`. Jeżeli pojawi się numer wersji wszystko jest w porządku. W przeciwnym wypadku sprawdź możliwe rozwiązania problemu tutaj: https://github.com/nvm-sh/nvm#troubleshooting-on-linux
3. Zainstaluj najnowszą wersję LTS Node.js poleceniem `nvm install --lts`. Po poprawnej instalacji polecenie `node -v` powinno wyświetlić numer wersji.
4. Zainstaluj Gulp.js globalnie poleceniem `npm install -g gulp`. Po poprawnej installacji polecenie `gulp -v` powinno wyświetlić numer wersji CLI.
5. Pobierz to repozytorium, rozpakuj je.
6. W wyszukiwarce Windows wpisz `\\wsl$\` i uruchom, otworzy Ci się folder WSL. Przejdź do `<nazwa_dystybucji>/home/<nazwa_uzytkownika>` i tam umieść rozpakowany katalog.
7. W terminalu WSL przejdź do tego katalogu (`cd ~/gulp-opt`) i wykonaj polecenie `npm install`

## Użycie

1. Umieść w katalog `src` pliki lub katalogi (np. katalog cały katalog `img` Prestashop, lub katalog motywu danego serwisu).
2. Wykonaj jedno z poniższych poleceń:

- `gulp images:compress` - kompresuje wszystkie pliki graficzne i umieszcza je w katalogu `dist` (z zachowaniem pierwotnej struktury katalogów i nazw plików).
- `gulp images:webp` - konwertuje pliki do formatu WebP i umieszcza je w katalogu `dist` (z zachowaniem pierwotnej struktury katalogów i nazw plików - ale ze zmienionym rozszerzeniem).
- `gulp css:minify` - minifikuje pliki CSS i umieszcza je w katalogu `dist` (z zachowaniem pierwotnej struktury katalogów i nazw plików).
- `gulp css:concat` - łączy wszystkie pliki CSS w jeden plik, minifikuje i umieszcza w katalogu `dist` pod nazwą `all.min.css`.
- `gulp js:minify` - minifikuje pliki JS i umieszcza je w katalogu `dist` (z zachowaniem pierwotnej struktury katalogów i nazw plików).
- `gulp js:concat` - łączy wszystkie pliki JS w jeden plik, minifikuje i umieszcza w katalogu `dist` pod nazwą `all.min.js`
- `gulp clean:all` - czyści zawartość katalogów `dist` i `src`.
- `gulp clean:dist` - czyści zawartość katalogi `dist`.
- `gulp clean:src` - czyści zawartość katalogi `dist`.

## Uwagi

- W przypadku poleceń łączących pamiętaj o odpowiednim podlinkowaniu plików w kodzie HTML.
- Ostrożnie korzystaj z opcji łączenia plików - może to powodować problemy w działaniu serwisu. Nie zalecane w przypadkach większych serwisów, których nie możesz dokładnie przetestować.
- Pamiętaj, aby przed wrzuceniem nowych plików do folderu `src` wyczyścić zawartość katalogów poleceniem `gulp clean`.
- W przypadku konwersji grafik do WebP, można skorzystać z pliku .htaccess, aby automatycznie serwować pliki WebP dla rządań plików w formatach JPEG i PNG na istniejący plik WebP. Dzięki temu nie jest konieczna ręczna podmiana adresów do plików w treści strony.

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On

# Check if browser supports WebP images

RewriteCond %{HTTP_ACCEPT} image/webp

# Check if WebP replacement image exists

RewriteCond %{DOCUMENT_ROOT}/$1.webp -f

# Serve WebP image instead

RewriteRule (.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=REQUEST_image]
</IfModule>

<IfModule mod_headers.c>
  # Vary: Accept for all the requests to jpeg, png
  Header append Vary Accept env=REQUEST_image
</IfModule>

<IfModule mod_mime.c>
  AddType image/webp .webp
</IfModule>
```

### Znalazłeś błąd, masz propozycje usprawnienia? Skontaktuj się ze mną :)
