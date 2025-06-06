"use client";

import * as React from "react";
import { Globe, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { languages, useTranslation } from "@/lib/TranslationContext";

export function LanguageSelector() {
  const [open, setOpen] = React.useState(false);
  const { currentLanguage, setLanguage } = useTranslation();

  const currentLang = React.useMemo(() => 
    languages.find(l => l.code === currentLanguage) || languages[0],
    [currentLanguage]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[140px] justify-between"
        >
          <Globe className="mr-2 h-4 w-4" />
          <span className="truncate">
            {currentLang?.name || "Select language"}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {languages.map((language) => (
              <CommandItem
                key={language.code}
                value={language.code}
                onSelect={() => {
                  setLanguage(language.code);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentLang?.code === language.code 
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {language.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}