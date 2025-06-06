# Usa la imagen oficial de .NET para compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiá los archivos del proyecto
COPY Backend/SubeteAPI/ ./

# Restaurá los paquetes y compilá
RUN dotnet restore
RUN dotnet publish -c Release -o out

# Usa una imagen más liviana para correr la app
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Expone el puerto
EXPOSE 80
ENTRYPOINT ["dotnet", "SubeteAPI.dll"]

