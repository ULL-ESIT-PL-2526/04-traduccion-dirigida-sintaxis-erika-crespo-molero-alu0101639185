# Informe práctica 4

Asignatura PL 

Jison is a tool that receives as input a Syntax Directed Translation and produces as output a JavaScript parser  that executes
the semantic actions in a bottom up ortraversing of the parse tree.

## Describa la diferencia entre /* skip whitespace */ y devolver un token.
/* skip whitespace */ es una acción que no devuelve ningún token. Simplemente ignora los espacios en blanco, tabuladores, etc. El analizador léxico continúa buscando el siguiente patrón sin generar un token para el lexema ignorado.
Devolver un token (con return 'ALGO') hace que el analizador léxico genere un token con ese nombre y lo pase al sintáctico. El token representa un elemento significativo para la gramática (como NUMBER, OP, EOF o INVALID).

## Escriba la secuencia exacta de tokens producidos para la entrada 123**45+@.
Vamos a procesar carácter a carácter:

123 → coincide con [0-9]+ → devuelve NUMBER.
** → coincide con "**" (primero porque está antes que [-+*/]) → devuelve OP.
45 → coincide con [0-9]+ → devuelve NUMBER.
+ → coincide con [-+*/] → devuelve OP.
@ → coincide con . (cualquier otro carácter) → devuelve INVALID.
Final de fichero → <<EOF>> → devuelve EOF.
Por tanto la secuencia es:
NUMBER, OP, NUMBER, OP, INVALID, EOF.

## Indique por qué ** debe aparecer antes que [-+*/].
Porque si [-+*/] apareciera primero, al encontrar ** el analizador tomaría el primer * como un token OP (ya que * está en la clase [-+*/]) y luego el segundo * como otro token OP, en lugar de reconocer el operador de exponenciación ** como un único token. El orden de las reglas en Jison es importante: la primera que coincide (en orden de arriba a abajo) es la que se aplica. Al poner "**" antes, el lexema ** es capturado completo antes de que se considere el patrón de un solo carácter.

## Explique cuándo se devuelve EOF.
Se devuelve cuando el analizador léxico alcanza el final del fichero de entrada (<<EOF>>). Esto indica que no hay más caracteres que procesar. Es necesario para que el analizador sintáctico sepa que la entrada ha terminado y pueda completar el análisis.

## Explique por qué existe la regla. que devuelve INVALID.
La regla . (que casa con cualquier carácter no reconocido por las reglas anteriores) sirve como manejo de errores léxicos. Si aparece un carácter que no es espacio, dígito, operador ni parte de **, se genera un token INVALID. Esto permite que el analizador sintáctico pueda detectar y reaccionar ante caracteres no válidos (por ejemplo, lanzando una excepción o mostrando un error). Sin esta regla, Jison podría detenerse con un error léxico; al devolver un token explícito, se puede controlar el flujo.