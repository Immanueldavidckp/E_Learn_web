/* Linker script for ARM M4 */
SECTIONS
{
  .text : { *(.text*) }
  .data : { *(.data*) }
  .bss : { *(.bss*) }
}
