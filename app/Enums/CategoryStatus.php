<?php

namespace App\Enums;

enum CategoryStatus: string
{
    case Active = 'active';
    case Deactive = 'deactive';

    public function label(): string
    {
        return match ($this) {
            self::Active => 'Active',
            self::Deactive => 'Deactive',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Active => 'bg-green-100 text-green-700',
            self::Deactive => 'bg-red-100 text-red-700',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn (self $case) => [
                'value' => $case->value,
                'label' => $case->label(),
                'color' => $case->color(),
            ],
            self::cases()
        );
    }
}
