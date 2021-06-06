{ pkgs ? import <nixpkgs> {} } : 
  pkgs.mkShell {
      nativeBuildInputs = with pkgs; [ nodejs electron wine nsis p7zip fpm ruby ];
      shellHook = ''
        export 
        # Add node module bins to path
        export PATH="$(pwd)/node_modules/.bin:$PATH"
      '';
      USE_SYSTEM_7ZA = true;
      USE_SYSTEM_FPM = true;
  }